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

  // token tallennetaan access_token -nimellä
  private tokenKey = 'access_token';

  // käyttäjä tallennetaan auth_user -nimellä
  private userKey = 'auth_user';

  // Otetaan käyttäjä muistista jos sessionStoragessa
  // kun käyttäjä oli kirjautunut --> tieto palautuu sivun päivityksen jälkeen
  private currentUser$ = new BehaviorSubject<AuthUser | null>(this.loadUser());

  // constructure kautta tarvitaan backend-kutsuihin
  constructor(private http: HttpClient) {}

  // ---------------- LOGIN ----------------
  login(data: LoginRequest): Observable<AuthResponse> {
    // kun käyttäjä lähettää kirjadumistiedot
    return (
      this.http
        // Lähetetään POST-pyyntö osoitteeseen /auth/login
        .post<AuthResponse>(`${this.baseUrl}/auth/login`, data)
        .pipe(
          // Backend palauttaa: token (JWT) ja käyttäjän tiedot
          tap((res) => {
            // tap() suoritetaan ilman että data muuttuu: sitten tallennetaan token ja käyttäjä sinne selaimen
            this.saveToken(res.token);
            this.saveUser(res.user);
          })
        )
    );
  }

  // ---------------- REGISTER ----------------
  register(data: AuthUser): Observable<AuthResponse> {
    // kun käyttäjä lähettää rekisteröidutiedot
    return (
      this.http
        // Lähetetään POST-pyyntö osoitteeseen /auth/register
        .post<AuthResponse>(`${this.baseUrl}/auth/register`, data)
        .pipe(
          // Backend palauttaa: token (JWT) ja käyttäjän tiedot
          tap((res) => {
            // tap() suoritetaan ilman että data muuttuu: sitten tallennetaan token ja käyttäjä sinne selaimen
            this.saveToken(res.token);
            this.saveUser(res.user);
          })
        )
    );
  }

  // ---------------- LOGOUT ----------------
  logout(): void {
    // poistaa tokenin
    sessionStorage.removeItem(this.tokenKey);
    // poistaa käyttäjän
    sessionStorage.removeItem(this.userKey);
    // ilmoittaa kaikille kuuntelijoille että käyttäjä = null → ei kirjautunuts
    this.currentUser$.next(null);
  }

  // ---------------- TOKEN METHODS ----------------
  // Palauttaa tokenin tai null
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  // muuntaa tokenin booleaniksi ja jos token on olemassa → käyttäjä on kirjautunut
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ---------------- USER OBSERVABLE ----------------
  // getUser metodi toimii, että muut komponentit voivat kuunnella tätä päästäkseen käsiksi käyttäjään
  getUser(): Observable<AuthUser | null> {
    return this.currentUser$.asObservable();
  }

  // palauttaa käyttäjän heti ilman tilausta
  getCurrentUserValue(): AuthUser | null {
    return this.currentUser$.value;
  }

  // palauttaa käyttäjän roolin (esim. tuottaja tai Asiakas)
  getRole(): string | null {
    return this.getCurrentUserValue()?.role ?? null;
  }

  // tallentaa käyttäjän selaimeen ja ilmoittaa muille komponenteille että käyttäjä on päivittynyt
  private saveUser(user: AuthUser): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUser$.next(user);
  }

  // kun sovellus käynnistyy, yrittää lukea käyttäjän sessionStoragesta
  private loadUser(): AuthUser | null {
    const raw = sessionStorage.getItem(this.userKey);
    return raw ? JSON.parse(raw) : null;
  }

  // tallettaa tokenin selaimeen
  private saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }
}
