import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../Models/address';
//import { UserAccountService } from 'src/app/Services/user-account.service';
//import { User } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  constructor(private httpClient: HttpClient/*, private userAccountService: UserAccountService*/) {
  }

  //AddAddress(address: Address): Observable<boolean> {
  //  address.creationDateTime = new Date().toLocaleDateString();
  //  address.lastModifiedDateTime = new Date().toLocaleDateString();
  //  address.addressID = this.uuidv4();
  //  address.retailerID = this.userAccountService.currentUserID;
  //  return this.httpClient.post<boolean>(`/api/addresses`, address);
  //}

  UpdateAddress(address: Address): Observable<boolean> {
    address.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/addresses`, address);
  }

  DeleteAddress(addressID: string, id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/addresses/${id}`);
  }

  GetAllAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`/api/addresses`);
  }

  GetAddressByAddressID(AddressID: number): Observable<Address> {
    return this.httpClient.get<Address>(`/api/addresses?addressID=${AddressID}`);
  }

  GetAddressByRetailerID(RetailerID: string): Observable<Address[]> {
    return this.httpClient.get<Address[]>(`/api/addresses?retailerID=${RetailerID}`);
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
