import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { HomeComponent } from './home.component';
import { ErrorComponent } from './error.component';
import { AppRoutingModule } from './app-routing.module';

import { PersonListComponent } from './person-list/person.list.component';
import { PersonEditComponent } from './person-edit/person.edit.component';
import { PersonCreateComponent } from './person-create/person.create.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    PersonListComponent,
    PersonEditComponent,
    PersonCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
