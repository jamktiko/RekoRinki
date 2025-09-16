import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  delete = false;
  private apiUrl = 'http://localhost:3000/messages';
  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  postMessage(contact: any): Observable<Contact> {
    const myToken = JSON.parse(sessionStorage['accesstoken']);
    const userName = myToken.username;
    const token = myToken.token;
    const headers = {
      headers: new HttpHeaders({ 'x-access-token': myToken.token }),
    };
    return this.http.post<Contact>(
      this.apiUrl + '/createmessage/' + userName,
      contact,
      headers
    );
  }
  getContacts(): Observable<Contact[]> {
    const myToken = JSON.parse(sessionStorage['accesstoken']);
    const token = myToken.token;
    const userName = myToken.username;
    const headers = {
      headers: new HttpHeaders({ 'x-access-token': myToken.token }),
    };
    return this.http.get<Contact[]>(
      this.apiUrl + '/getmessages/' + userName,
      headers
    );
  }
  deleteContact(id: number): Observable<Contact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Contact>(url).pipe();
  }
}
