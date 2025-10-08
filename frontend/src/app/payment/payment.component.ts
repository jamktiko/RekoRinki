import { Component, inject } from '@angular/core';
import { CartStore } from '../cartstore';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  readonly cstore = inject(CartStore);
}
