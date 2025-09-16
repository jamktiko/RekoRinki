import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(public contactService: ContactService) {}
  ngOnInit() {
    this.contactService.getContacts().subscribe({
      next: (data) => (this.contacts = data),
      error: (err) => console.error(err),
    });
    console.log(this.contacts);
  }
  remove(c: Contact) {
    this.contactService.delete = true;
    this.contacts = this.contacts.filter((contact) => contact !== c);
    this.contactService.deleteContact(c.id).subscribe();
    setTimeout(() => {
      this.contactService.delete = false;
    }, 3000);
  }
}
