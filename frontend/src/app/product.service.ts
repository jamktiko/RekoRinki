// ProductService: hakee tuotteet ja välittää ne ProductStorelle.

import { Injectable } from '@angular/core';
// HttpClient tarvitaan datan lähettämiseen palvelimelle ja sen hakemiseen palvelimelta
import { HttpClient } from '@angular/common/http';
// Palvelimelta tuleva data toimitetaan komponenteille Observablena eli reaktiivisesti.
import { Observable } from 'rxjs';
// tietotyyppi
import { Product } from './types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // valepalvelimen osoite
  serverurl = environment.apiUrl;
  // serverurl = 'api/';

  // liitetään eli injektoidaan HttpClient-olio tähän luokkaan konstruktorin argumenttina (Dependency injection)
  constructor(private http: HttpClient) {}

  // Tehdään palvelimelle pyyntö jolla haetaan products-taulukko observablena
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.serverurl}/products`);
    //virheenkäsittely voitaisiin tehdä tähän
  }
}
