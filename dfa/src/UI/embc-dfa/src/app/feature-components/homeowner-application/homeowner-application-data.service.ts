import { Injectable } from '@angular/core';
import { HomeOwnerApplication, DamagedPropertyAddress, PropertyDamage} from 'src/app/core/model/homeowner-application.model';
import { CacheService } from 'src/app/core/services/cache.service';

@Injectable({ providedIn: 'root' })
export class HomeOwnerApplicationDataService {
  private _damagedPropertyAddress: DamagedPropertyAddress;
  private _propertyDamage: PropertyDamage;
  private _homeOwnerApplication: HomeOwnerApplication;
  private _homeOwnerApplicationId: string;

  constructor(
    private cacheService: CacheService
  ) {}

  public getHomeOwnerApplication(): HomeOwnerApplication {
    if (this._homeOwnerApplication === null || undefined) {
      this._homeOwnerApplication = JSON.parse(this.cacheService.get('homeowner-application'));
    }
    return this._homeOwnerApplication;
  }

  public setHomeOwnerApplication(homeOwnerApplication: HomeOwnerApplication): void {
    this._homeOwnerApplication = homeOwnerApplication;
    this.cacheService.set('homeowner-application', homeOwnerApplication);
  }

  public setHomeOwnerApplicationId(id: string): void {
    this._homeOwnerApplicationId = id;
  }

  public get damagedPropertyAddress(): DamagedPropertyAddress {
    return this._damagedPropertyAddress;
  }

  public set damagedPropertyAddress(value: DamagedPropertyAddress) {
    this._damagedPropertyAddress = value;
  }

  public get propertyDamage(): PropertyDamage {
    return this._propertyDamage;
  }

  public set propertyDamage(value: PropertyDamage) {
    this._propertyDamage = value;
  }

   public createHomeOwnerApplicationDTO(): HomeOwnerApplication {
    return {
      damagedPropertyAddress: this._damagedPropertyAddress,
      propertyDamage: this._propertyDamage,
      occupants: null,
      cleanUpLog: null,
      damagedItemsByRoom: null
    };
  }
}
