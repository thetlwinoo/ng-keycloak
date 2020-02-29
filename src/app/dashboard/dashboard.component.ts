import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { AddressTypesService } from 'app/shared/services/address-types.service';
import { IAddressTypes } from 'app/shared/model/address-types.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  addressTypes: IAddressTypes[];

  constructor(private authService: AuthService, private addressTypesService: AddressTypesService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  getValidToken() {
    return this.authService.getValidToken();
  }

  loadAll() {
    this.addressTypesService.query().subscribe((res: HttpResponse<IAddressTypes[]>) => {
      this.addressTypes = res.body;
    });
  }
}
