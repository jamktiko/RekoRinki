/**
 * RoleGuard – suojaa reitit eri käyttäjille
 * Guard lukee reitin data.roles
 * Vertaa sitä AuthUser.role
 * Jos rooli ei ole sallittu → blokkaa
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.serive';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  // auth → antaa käyttäjäobjektin (nimi, id, rooli)
  // router → voidaan ohjata muille sivuille, jos ei oikeuksia
  constructor(private auth: AuthService, private router: Router) {}

  // canActivate() – Päättää saako käyttäjä mennä reitille
  canActivate(route: any): boolean {
    // Luetaan reitille määritellyt sallitut roolit
    const allowedRoles: string[] = route.data['roles'];

    // Haetaan kirjautunut käyttäjä
    const user = this.auth.getCurrentUserValue();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // Jos käyttäjän rooli EI ole sallittu
    if (!allowedRoles.includes(user.role)) {
      this.router.navigate(['/403']); // forbidden / virhesivu
      return false;
    }

    return true;
  }
}
