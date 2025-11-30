/**
 * Serivce hoitaa kirjautumisen backendille.
 * Vastauksesta puretaan token ja validoidaan se.
 * Jos OK → tallennetaan sessionStorageen ja ilmoitetaan UI:lle.
 * Subjectillä lähetetään “login onnistui” muille komponenteille.
 * Logout tyhjentää tokenit.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, AuthUser } from './types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:3000/auth/login';
  private baseUrl = environment.apiUrl;

  private tokenKey = 'access_token';
  private userKey = 'auth_user';

  // Otetaan käyttäjä muistista jos sessionStoragessa
  private currentUser$ = new BehaviorSubject<AuthUser | null>(this.loadUser());

  constructor(private http: HttpClient) {}

  // ---------------- LOGIN ----------------
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, data)
      .pipe(
        tap((res) => {
          this.saveToken(res.token);
          this.saveUser(res.user);
        })
      );
  }

  // ---------------- REGISTER ----------------
  register(data: AuthUser): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/register`, data)
      .pipe(
        tap((res) => {
          this.saveToken(res.token);
          this.saveUser(res.user);
        })
      );
  }

  // ---------------- LOGOUT ----------------
  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this.currentUser$.next(null);
  }

  // ---------------- TOKEN METHODS ----------------
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ---------------- USER OBSERVABLE ----------------
  getUser(): Observable<AuthUser | null> {
    return this.currentUser$.asObservable();
  }

  getCurrentUserValue(): AuthUser | null {
    return this.currentUser$.value;
  }

  getRole(): string | null {
    return this.getCurrentUserValue()?.role ?? null;
  }

  private saveUser(user: AuthUser): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUser$.next(user);
  }

  private loadUser(): AuthUser | null {
    const raw = sessionStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

  private saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }
}
