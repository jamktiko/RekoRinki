// reititystiedosto

import { Routes } from '@angular/router';
import { TuotteetComponent } from './tuotteet/tuotteet.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ProducersComponent } from './producers/producers.component';
import { HomeComponent } from './home/home.component';
import { ProfiiliComponent } from './profiili/profiili.component';
import { IlmoituksetComponent } from './ilmoitukset/ilmoitukset.component';
import { IlmoitustuotteetComponent } from './ilmoitustuotteet/ilmoitustuotteet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ilmoitukset', pathMatch: 'full' },
  {
    component: TuotteetComponent,
    path: 'tuotteet',
  },
  {
    component: CartComponent,
    path: 'cart',
  },
  {
    component: PaymentComponent,
    path: 'payment',
  },
  { component: ProducersComponent, path: 'producers/:id' },
  {
    component: HomeComponent,
    path: 'home',
  },

  {
    component: IlmoituksetComponent,
    path: 'ilmoitukset',
  },
  {
    component: IlmoitustuotteetComponent,
    path: 'ilmoitustuotteet/id/:id',
  },
  {
    component: ProfiiliComponent,
    path: 'profiili',
  },
];
