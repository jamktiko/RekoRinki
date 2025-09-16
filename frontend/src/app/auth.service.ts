import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt'; // kirjasto jwt:n käsittelyyn
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string;
  private apiUrl = 'http://localhost:3000/messages';
  private jwtHelp = new JwtHelperService();
  private subject = new Subject<any>();
  constructor(private http: HttpClient) {
    const user = JSON.parse(sessionStorage.getItem('accestoken') || '{}');
    this.token = user || user.token;
  }
  login(username: String, password: String): Observable<boolean> {
    return this.http
      .post(this.apiUrl + '/login', {
        username: username,
        password: password,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          const token = res['token'];
          console.log(token);
          if (token) {
            this.token = token;
            try {
              const payload = this.jwtHelp.decodeToken(token);
              if (payload.username === username) {
                sessionStorage.setItem(
                  'accesstoken',
                  JSON.stringify({ username: username, token: token })
                );
                this.loginTrue();
                console.log('kirjautuminen onnistui');
                return true;
              } else {
                return false;
              }
            } catch (err) {
              return false;
            }
          } else {
            console.log('Kirjautuminen epäonnistui');
            return false;
          }
        })
      );
  }
  register(username: string, password: string): Observable<Boolean> {
    return this.http
      .post(this.apiUrl + '/register', {
        username: username,
        password: password,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          const token = res['token'];
          console.log(token);
          if (token) {
            this.token = token;
            try {
              const payload = this.jwtHelp.decodeToken(token);
              if (payload.username === username) {
                sessionStorage.setItem(
                  'accesstoken',
                  JSON.stringify({ username: username, token: token })
                );
                this.loginTrue();
                console.log('Rekisteröinti onnistui');
                return true;
              } else {
                return false;
              }
            } catch (err) {
              return false;
            }
          } else {
            console.log('Rekisteröityminen epäonnistui');
            return false;
          }
        })
      );
  }

  loginTrue(): Observable<any> {
    this.subject.next(true);
    return this.subject.asObservable();
  }
  logout(): void {
    this.token = '';
    sessionStorage.removeItem('accesstoken');
  }
}
