import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Order } from '../Models/Order';
import { OrderDetail } from '../Models/Order';
import { Product } from '../Models/Product';
import { Address } from '../Models/Address';


@Injectable({
  providedIn: 'root'
})
export class GreatOutdoorsDataService implements InMemoryDbService {
  constructor() { }

  createDb() {
    let orders = [
      new Order(1, "1010", "01/01/2018", "1020", null, 10, "Online", 1200, "01/01/2018", "02/01/2018"),
      new Order(2, "1011", "01/02/2018", "1020", null, 9, "Online", 900, "01/02/2018", "02/02/2018"),
      new Order(3, "1012", "01/03/2018", "1020", null, 11, "Online", 1300, "01/03/2018", "02/03/2018"),
    ];

    let orderDetails = [
      new OrderDetail(1, "101010", "1010", "2010","A", 5, 1200, 6000, "InCart", "10", "01/01/2018", "02/01/2018"),
      new OrderDetail(2, "101011", "1010", "2011", "A", 5, 700, 3500, "InCart", "10", "01/01/2018", "02/01/2018"),
      new OrderDetail(3, "101012", "1010", "2010", "A", 5, 1200, 6000, "InCart", "10", "01/01/2018", "02/01/2018"),
    ];

    let addresses = [
      new Address(1, "C628855C-FE7A-4D94-A1BB-167157D3F4EA", "CKP", "Airoli", "Thane", "Mumbai", "Maharastra", "407008", "401476EE-0A3B-482E-BD5B-B94A32355959", "10/3/2019", "10/4/2019"),
      new Address(2, "6D68849C-8FA8-4049-A111-B431C76C6548", "Yesomite", "Airoli", "Thane", "Mumbai", "Maharastra", "407008", "401476EE-0A3B-482E-BD5B-B94A32355959", "10/3/2019", "10/4/2019"),
      new Address(3, "53E8748F-61D6-494B-BF72-E18B27511EFA", "Andheri", "Airoli", "Thane", "Mumbai", "Maharastra", "407008", "401476EE-0A3B-482E-BD5B-B94A32355959", "10/3/2019", "10/4/2019"),

    ];

    let products = [
      new Product(1, "2010", "BCKPCK", "Back Pack", "Camping Equipment", "assets/images/1.jpg", 15, "Small", "Black", "Material - Polyester, Strap - Adjustable",
        1000, 1200, 0),
      new Product(2, "2011", "GSTCK", "Golf Stick", "Camping Equipment", "assets/images/2.jpg", 10, "Small", "White", "Hand Orientation - Right",
        500, 700, 5),
      new Product(3, "2010", "BCKPCK", "Back Pack", "Golf Equipment", "assets/images/1.jpg", 10, "Small", "Black", "Material - Polyester, Strap - Adjustable",
        1000, 1200, 0),
      new Product(4, "2011", "GSTCK", "Golf Stick", "Golf Equipment", "assets/images/2.jpg", 10, "Small", "White", "Hand Orientation - Right",
        500, 700, 5),
      new Product(5, "2010", "BCKPCK", "Back Pack", "Mountaineering Equipment", "assets/images/3.jpg", 10, "Small", "Black", "Material - Polyester, Strap - Adjustable",
        1000, 1200, 0),
      new Product(6, "2011", "GSTCK", "Golf Stick", "Mountaineering Equipment", "assets/images/1.jpg", 10, "Small", "White", "Hand Orientation - Right",
        500, 700, 5),
      new Product(7, "2010", "BCKPCK", "Back Pack", "Camping Equipment", "assets/images/2.jpg", 10, "Small", "Black", "Material - Polyester, Strap - Adjustable",
        1000, 1200, 0),
      new Product(8, "2011", "GSTCK", "Golf Stick", "Camping Equipment", "assets/images/1.jpg", 10, "Small", "White", "Hand Orientation - Right",
        500, 700, 5),

    ];
    return { orders, orderDetails, products, addresses };
  }
}
