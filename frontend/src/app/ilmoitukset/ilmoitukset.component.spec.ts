// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';

// import { IlmoituksetComponent } from './ilmoitukset.component';
// import { NotificationService } from '../notification.service'; // varmista polku

// describe('IlmoituksetComponent', () => {
//   let component: IlmoituksetComponent;
//   let fixture: ComponentFixture<IlmoituksetComponent>;

//   // Mock-data, jota käytetään testissä
//   const mockIlmoitukset = [
//     { id: 1, teksti: 'Ilmoitus 1' },
//     { id: 2, teksti: 'Ilmoitus 2' },
//   ];

//   // Mock NotificationService
//   const mockNotificationService = {
//     haeIlmoitukset: () => of(mockIlmoitukset),
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [IlmoituksetComponent], // sinulla standalone-komponentti
//       providers: [
//         { provide: NotificationService, useValue: mockNotificationService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(IlmoituksetComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // aja ngOnInit ym.
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch all notifications', () => {
//     // Testaa että komponentin ilmoitukset ovat samat, jotka mock-palvelu palauttaa
//     expect(component.ilmoitukset).toEqual(mockIlmoitukset);
//     expect(component.ilmoitukset.length).toBe(2);
//   });
// });
