import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { DotnetService } from "./dotnet.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public dotnetservice: DotnetService,
        public router: Router
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var auths = route.data["auths"] as Array<string>;
        var goback = route.data["goback"] as string;

        if (!this.dotnetservice.checkLogin || !auths || !auths.length) {
            this.router.navigate([goback]);
            return false;
        }

        var sonuc: boolean = false;
        sonuc = this.dotnetservice.authControl(auths);
        if (!sonuc) {
            this.router.navigate([goback]);
        }
        return sonuc;

    }


}