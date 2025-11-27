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
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const allowedRoles: string[] = route.data['roles'];
    const user = this.auth.getCurrentUserValue();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!allowedRoles.includes(user.role)) {
      this.router.navigate(['/403']); // forbidden / virhesivu
      return false;
    }

    return true;
  }
}
