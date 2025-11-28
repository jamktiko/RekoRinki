// reititystiedosto

import { Routes } from '@angular/router';
import { TuotteetComponent } from './tuotteet/tuotteet.component';
import { OstoskoriComponent } from './ostoskori/ostoskori.component';
import { TuottajatComponent } from './tuottajat/tuottajat.component';
import { ProfiiliComponent } from './profiili/profiili.component';
import { IlmoituksetComponent } from './ilmoitukset/ilmoitukset.component';
import { IlmoitusComponent } from './ilmoitus/ilmoitus.component';
import { RegisterComponent } from './rekisterointi/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/ilmoitukset', pathMatch: 'full' },
  {
    component: TuotteetComponent,
    path: 'tuotteet',
  },

  // ostoskori vain asiakkaalle
  {
    component: OstoskoriComponent,
    path: 'ostoskori',
    // canActivate: [RoleGuard],
    // data: { roles: ['asiakas'] },
  },

  // tuottajan sivut
  {
    component: TuottajatComponent,
    path: 'tuottajat/:id',
    // canActivate: [RoleGuard],
    // data: { roles: ['tuottaja'] },
  },

  {
    component: IlmoituksetComponent,
    path: 'ilmoitukset',
  },

  {
    component: IlmoitusComponent,
    path: 'ilmoitus/:id',
  },

  // profiili molemmille
  {
    component: ProfiiliComponent,
    path: 'profiili',
    // canActivate: [RoleGuard],
    // data: { roles: ['asiakas', 'tuottaja'] },
  },
  {
    component: RegisterComponent,
    path: 'rekisterointi',
  },

];
