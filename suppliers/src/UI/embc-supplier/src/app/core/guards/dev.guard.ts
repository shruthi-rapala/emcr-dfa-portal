import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerConfig } from '../model/server-config';
import { SupplierService } from '../services/supplier.service';
import { SupplierHttpService } from '../services/supplierHttp.service';

@Injectable({
  providedIn: 'root'
})
export class DevGuard implements CanActivate {
  public configResult: ServerConfig = new ServerConfig();

  constructor(
    private router: Router,
    private supplierService: SupplierService,
    private supplierHttp: SupplierHttpService
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // This is set in app.component.ts
    if (!this.supplierService.getServerConfig())
      this.supplierService.setServerConfig(this.supplierHttp.getServerConfig());

    return this.supplierService.getServerConfig().pipe(
      map(config => {
        // If code is up in PROD, prevent from loading whatever is behind this guard.
        this.configResult = config;

        if (this.configResult.environment === "production") {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}