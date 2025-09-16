import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  submit: boolean;
  constructor(private router: Router, private contactservice: ContactService) {
    this.submit = false;
  }
  onSubmit(post: Contact) {
    console.log(post);

    this.contactservice.postMessage(post as Contact).subscribe();
    this.submit = true;
    console.log(post);
    console.log('testi');
    setTimeout(() => {
      this.submit = false;
    }, 3000);
  }
}
