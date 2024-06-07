import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Person } from '../model/person';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Feedback } from '../model/feedback';

@Component({
  templateUrl: './person.create.component.html',
})

export class PersonCreateComponent implements OnInit {

  id: number;
  private sub: Subscription;
  people: Person[];
  person: Person = { id: null, first_name: "", last_name: "", email: "" };
  userForm: FormGroup;
  feed = new Feedback("","");
  isLoading: boolean = false;

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
  }

  loadAllPerson() {
    this.personService.getPeople().subscribe({
      next: (data: Person[]) => {
        this.people = data;
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
  }


  ngOnInit() {
    this.feed = { feedbackType: "", feedbackMsg: "" };
  }

  onSubmit() {
    console.log(this.userForm.value);

    const personCreated: Person={
      id: null,
      //...this.userForm.value //SERVE PER ESTRARRE VALORI NEL FORM CONTROL
      first_name: this.first_name.value,
      last_name: this.last_name.value,
      email: this.email.value
    }

    this.personService.addPerson(personCreated).subscribe({
      next:(data) =>{
        this.router.navigate(['/person-list']);
      },
      error:(err)=>{
        console.error(err)
      }
    })
    
    this.loadAllPerson();
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