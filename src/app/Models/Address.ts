export class Address {
  id: number;
  addressID: string;
  retailerID: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pinCode: string;
  creationDateTime: string;
  lastModifiedDateTime: string;
  //Address Model Class consructor
  constructor(ID: number,AddressID:string, AddressLine1: string, AddressLine2: string, Landmark: string, City: string, State: string,PinCode:string,RetailerID:string, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.addressID = AddressID;
    this.addressLine1 = AddressLine1;
    this.addressLine2 = AddressLine2;
    this.landmark = Landmark;
    this.city = City;
    this.state = State;
    this.pinCode = PinCode;
    this.retailerID = RetailerID;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}

