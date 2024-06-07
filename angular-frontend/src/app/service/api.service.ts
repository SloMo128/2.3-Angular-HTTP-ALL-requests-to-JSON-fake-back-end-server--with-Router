import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Person } from '../model/person';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'

@Injectable()
export class ApiService {

  baseURL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseURL + '/people')
      .pipe(catchError((err) => this.handleError('GET', err)));

  }

  addPerson(person: Person): Observable<Person> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(person);
    console.log(body)
    return this.http.post<Person>(this.baseURL + '/people', body, { 'headers': headers })
      .pipe(catchError((err) => this.handleError('ADD PERSON', err)));
  }

  deletePerson(id: number): Observable<Person> {
    return this.http.delete<Person>(this.baseURL + '/people/' + id)
      .pipe(catchError((err) => this.handleError('DELETE PERSON', err)));
  }

  getPeopleByID(id: number): Observable<Person> {
    return this.http.get<Person>(this.baseURL + '/people/' + id)
    .pipe(catchError((err) => this.handleError('GET People By ID', err)));
  }

  putPerson(person: Person): Observable<Person> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(person);
    console.log(body)
    return this.http.put<Person>(this.baseURL + '/people/' + person.id, body, { 'headers': headers })
      .pipe(catchError((err) => this.handleError('PUT Person', err)));
  }

      // Error handling 
      private handleError(method: string, error: HttpErrorResponse) {
        console.log(`Cannot ${method}`);
        const errObj = {
          err: error,
          type: 'error',
          msg: '',
        };
        switch (error.status) {
          // json-server not running
          case 0:
            errObj.msg = 'Internal server error.';
            break;
          case 401:
            errObj.msg = 'unauthorized';
            break;
          case 403:
            errObj.msg = 'forbidden';
            break;
          case 404:
            errObj.msg = 'not found';
            break;
          case 500:
            errObj.msg = 'Internal server error.';
            break;
          default:
            errObj.msg = 'An error occurred.';
        }
        return throwError(errObj);
      }


}
