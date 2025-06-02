import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';
export const IsAdminOrOwnerGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  await firstValueFrom(authService.checkAuthStatus());
  return authService.isAdmin() || authService.isOwner();
};

export const IsOwnerGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  await firstValueFrom(authService.checkAuthStatus());
  return authService.isOwner();
};

