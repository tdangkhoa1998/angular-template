import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CredentialsService } from '@shared/services/credentials.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private credentialsService: CredentialsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        //Check permission user has access
        const _permissions = route.data['permissions'] || [];
        const _isAuthorize = route.data['authorize'] || false;
        return this.checkUserHasPermission(state.url, _permissions, _isAuthorize);
    }

    checkUserHasPermission(url: string, _permissions: any, authorize: boolean): boolean {
        const _isAuthenticated = this.credentialsService.isAuthenticated();
        //Check user has authorize
        if (_isAuthenticated) {
            //Check user roles
            if (authorize && (_permissions.length == 0)) {
                return true;
            } else if (_permissions && (this.credentialsService.hasPermissionOn(_permissions[0], _permissions[1]))) {
                return true;
            } else {
                this.router.navigate(['unauthorized']);
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
