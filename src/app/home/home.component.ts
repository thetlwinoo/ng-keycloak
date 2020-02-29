import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AddressTypesService } from 'app/shared/services/address-types.service';
import { IAddressTypes } from 'app/shared/model/address-types.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  title = 'Home Module';
  addressTypes: IAddressTypes[];

  account: Account | null = null;

  constructor(private addressTypesService: AddressTypesService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.addressTypesService.query().subscribe((res: HttpResponse<IAddressTypes[]>) => {
      this.addressTypes = res.body;
    });
  }
}
