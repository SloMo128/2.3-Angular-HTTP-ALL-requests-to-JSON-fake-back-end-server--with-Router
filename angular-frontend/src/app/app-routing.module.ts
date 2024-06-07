import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { PersonCreateComponent } from './person-create/person.create.component';
import { ErrorComponent } from './error.component';
import { PersonListComponent } from './person-list/person.list.component';
import { PersonEditComponent } from './person-edit/person.edit.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  //{ path: 'person-create', component: PersonCreateComponent },
  { path: 'person-edit/:id', component: PersonEditComponent },
  { path: 'person-list', component: PersonListComponent },
  { path: 'person-create', component: PersonCreateComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
