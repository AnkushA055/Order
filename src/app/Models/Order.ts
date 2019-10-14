export class Order {
  id: number;
  orderID: string;
  orderDate: string;
  retailerID: string;
  salesPersonID: string;
  totalQuantity: number;
  totalAmount: number;
  channelOfSale: string;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, OrderID: string, OrderDate: string, RetailerID: string, SalesPersonID: string,
    TotalQuantity: number, ChannelOfSale: string, TotalAmount: number, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.orderID = OrderID;
    this.orderDate = OrderDate;
    this.retailerID = RetailerID;
    this.salesPersonID = SalesPersonID;
    this.totalQuantity = TotalQuantity;
    this.totalAmount = TotalAmount;
    this.channelOfSale = ChannelOfSale;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}


//Order Details which contains the cart.

export class OrderDetail {
  id: number;
  orderDetailID: string;
  orderID: string;
  productID: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: string;
  addressID: string;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, OrderDetailID: string, OrderID: string, ProductID: string, ProductName:string, Quantity: number,
    UnitPrice: number, TotalPrice: number, Status: string, AddressID: string, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.orderDetailID = OrderDetailID;
    this.orderID = OrderID;
    this.productID = ProductID;
    this.productName = ProductName;
    this.quantity = Quantity;
    this.unitPrice = UnitPrice;
    this.totalPrice = TotalPrice;
    this.status = Status;
    this.addressID = AddressID;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}
