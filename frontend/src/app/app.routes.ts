// reititystiedosto

import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ProducersComponent } from './producers/producers.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { IlmoitustuotteetComponent } from './ilmoitustuotteet/ilmoitustuotteet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/notifications', pathMatch: 'full' },
  {
    component: ProductsComponent,
    path: 'products',
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
    component: ProfileComponent,
    path: 'profile',
  },
  {
    component: NotificationsComponent,
    path: 'notifications',
  },
  {
    component: IlmoitustuotteetComponent,
    path: 'ilmoitustuotteet/id/:id',
  },
];
