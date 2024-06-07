import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Person } from '../model/person';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feedback } from '../model/feedback';

@Component({
  templateUrl: './person.edit.component.html',
})

export class PersonEditComponent implements OnInit {

  id: number;
  private sub: Subscription;
  people: Person[];
  person: Person = { id: null, first_name: "", last_name: "", email: "" };
  userForm: FormGroup;
  feed = new Feedback("", "");
  isLoading: boolean = false;
  timeoutID: ReturnType<typeof setTimeout>;


  constructor(
    private personService: ApiService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,

  ) {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+$")]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.loadAllPerson();
  }


  getPersonByID(id: number) {
    this.personService.getPeopleByID(id).subscribe({
      next: (data: Person) => {
        this.userForm.setValue({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        })
      }
    })
  }

  /*loadAllPerson() {
    this.personService.getPeople().subscribe({
      next: (data: Person[]) => {
        this.feed = { feedbackType: 'success', feedbackMsg: 'Person updated successfully!' };
        setTimeout(() => this.router.navigate(['/person-list']), 4000);
      },
      error: (err: any) => {
        console.log(err);
        this.feed = {
          feedbackType: err.type,
          feedbackMsg: err.msg,
        };
      },
      complete: () => {
        this.isLoading = true;
        this.feed = { feedbackType: 'success', feedbackMsg: 'loaded' };
      },
    });
  }*/


  loadAllPerson() {
    this.personService.getPeople().subscribe({
      next: (data: Person[]) => {
        this.feed = { feedbackType: 'success', feedbackMsg: 'Data loaded successfully' };
        setTimeout(() => this.router.navigate([]));
      },
      error: (err: any) => {
        console.log(err);
        this.feed = { feedbackType: 'error', feedbackMsg: 'Failed to load people: ' + err.msg };
      },
      complete: () => {
        this.isLoading = true;
      },
    });
  }

  ngOnInit() {
    this.sub = this.actRoute.params.subscribe(params => {
      this.id = +params['id'];                // (+) converts string 'id' to a number
      this.getPersonByID(this.id);
    });
    //this.refreshPeople();
  }



  onSubmit() {
    console.log(this.userForm.value);

    //this.personUpdated(this.id);

    if (window.confirm("Sicuro di modificare l'utente")) {
      const personUpdated: Person = {

        id: this.id,
        //...this.userForm.value //SERVE PER ESTRARRE VALORI NEL FORM CONTROL
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value
      }
      this.personService.putPerson(personUpdated).subscribe({
        next: () => {
          this.router.navigate(['/person-list']);
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }

  get first_name() {
    return this.userForm.get('first_name');
  }

  get last_name() {
    return this.userForm.get('last_name');
  }

  get email() {
    return this.userForm.get('email');
  }
}