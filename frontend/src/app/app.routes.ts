// reititystiedosto

import { Routes } from '@angular/router';
import { TuotteetComponent } from './tuotteet/tuotteet.component';
import { OstoskoriComponent } from './ostoskori/ostoskori.component';
import { PaymentComponent } from './payment/payment.component';
import { TuottajatComponent } from './tuottajat/tuottajat.component';
import { HomeComponent } from './home/home.component';
import { ProfiiliComponent } from './profiili/profiili.component';
import { IlmoituksetComponent } from './ilmoitukset/ilmoitukset.component';
import { IlmoitusComponent } from './ilmoitus/ilmoitus.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ilmoitukset', pathMatch: 'full' },
  {
    component: TuotteetComponent,
    path: 'tuotteet',
  },
  {
    component: OstoskoriComponent,
    path: 'ostoskori',
  },
  {
    component: PaymentComponent,
    path: 'payment',
  },
  { component: TuottajatComponent, path: 'tuottajat/:id' },
  {
    component: HomeComponent,
    path: 'home',
  },

  {
    component: IlmoituksetComponent,
    path: 'ilmoitukset',
  },
  {
    component: IlmoitusComponent,
    path: 'ilmoitus/id/:id',
  },
  {
    component: ProfiiliComponent,
    path: 'profiili',
  },
];
