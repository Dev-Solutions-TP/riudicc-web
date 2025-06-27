import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { first, firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (
    route: Route,
    segments: UrlSegment[]
) => {

    const router = inject(Router);
    const authService = inject(AuthService);

    const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());

    console.log('NotAuthenticatedGuard', isAuthenticated);
    if (isAuthenticated) {
        router.navigateByUrl('/');
        console.log('User is authenticated, redirecting to home');
        return false;
    }

    return true;
}