import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Person } from '../model/person';
import { Feedback } from '../model/feedback';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: './person.list.component.html',
})

export class PersonListComponent {

  people: Person[] = [];
  person: Person = { id: null, first_name: "", last_name: "", email: "" };
  isLoading: boolean = false;
  feed = new Feedback("", "");
  timeoutID: ReturnType<typeof setTimeout>;
  router: Router;

  constructor(private personService: ApiService) {
    this.loadAllPerson();
  }

  loadAllPerson() {
    this.personService.getPeople().subscribe({
      next: (data: Person[]) => {
        if (data.length !== 0) {
          data.map((item: { id: number; first_name: string; last_name: string; email: string; }) => {
            this.people.push({
              id: item.id,
              first_name: item.first_name,
              last_name: item.last_name,
              email: item.email
            });
          });
          this.isLoading=true;
          this.feed = { feedbackType: 'success', feedbackMsg: 'loaded' };
        };

        //this.people = data;
      },
      error: (err: any) => {
        console.log(err);
        this.feed = {
          feedbackType: err.type,
          feedbackMsg: err.msg,
        };
      },
      complete: () => {},
    });
  }

  /*loadAllPerson() {
    this.personService.getPeople().subscribe({
      next: (data: Person[]) => {
        this.feed = { feedbackType: 'success', feedbackMsg: 'DATI AGGIUNTI' };
        //setTimeout(() => this.router.navigate([]));
      },
      error: (err: any) => {
        console.log(err);
        this.feed = { feedbackType: 'error', feedbackMsg: 'Failed to load people: ' + err.msg };
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }*/

  ngOnInit() {

    //this.refreshPeople();
    this.feed = { feedbackType: "", feedbackMsg: "" };
  }

  refreshPeople() {
    this.personService.getPeople()
      .subscribe(data => {
        console.log(data)
        this.people = data;
      })
  }

  deletePerson(person, index) {

    if (this.isLoading == true) {
      if (window.confirm("Sicuro di elimare l'utente")) {
        this.personService.deletePerson(person.id).subscribe(data => {
            /*console.log(data);
            this.refreshPeople();*/
              this.people.splice(index, 1);

          })
      }
      //this.people=[]
      //this.loadAllPerson();
    }

  }
}