import { Component, OnInit } from '@angular/core';
import { Order, OrderDetail } from '../../Models/Order';
import { OrdersService } from '../../Services/orders.service';
import { OrderDetailsService } from '../../Services/orders.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { GreatOutdoorsComponentBase } from '../../greatoutdoors-component';
import { ProductsService } from '../../Services/products.service';
import { Product } from '../../Models/Product';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.scss']
})
export class NewOrdersComponent extends GreatOutdoorsComponentBase implements OnInit {

  viewProductForm: FormGroup;
  viewDiscountedPrice: boolean = false;
  viewOriginalPrice: boolean = true;
  discountAv: number = 0;
  price: number;
  currentProduct: OrderDetail;
  currentCartObject: OrderDetail;
  currentIndex: number;
  currentQuantity: number = 1;
  maxStock: number = 0;
  actualSellingPrice: number = 0;
  orderDetails: OrderDetail[] = [];
  products: Product[] = [];
  orderDetailsForId: OrderDetail[] = [];



  ngOnInit() { };

  showCat1div: boolean = false;
  showCat2div: boolean = false;
  showCat3div: boolean = false;
  showCat4div: boolean = false;
  showCat5div: boolean = false;
  categorySelected: string;
  //product response
 


  constructor(private productsService: ProductsService,private orderDetailService : OrderDetailsService) {

    super();
    //constructor for viewing product specific details
    this.viewProductForm = new FormGroup({
      id: new FormControl(0),
      productID: new FormControl(null),
      productName: new FormControl(null),
      image: new FormControl(null),
      size: new FormControl(null),
      colour: new FormControl(null),
      techSpecs: new FormControl(null),
      sellingPrice: new FormControl(0),
      quantity: new FormControl(0),
      discountAvailable: new FormControl(false),
      discount: new FormControl(0),
      originalPrice: new FormControl(0)
    });


    this.currentCartObject = new OrderDetail(0,null,null,null,null,0,0,0,null,null,null,null);

  }


  //On cliclking first button
  onClickCat1() {

    this.productsService.GetAllProducts().subscribe((response) => {
      this.products = response;
      console.log(this.products);
    }, (error) => {
      console.log(error);
    })

    this.showCat1div = true;
    this.showCat2div = false;
    this.showCat3div = false;
    this.showCat4div = false;
    this.showCat5div = false;
    this.categorySelected = "Camping Equipment";
    console.log(this.categorySelected);
    this.productsService.GetProductsByCategory(this.categorySelected).subscribe((response) => {
      this.products = response;
      console.log(this.products);
    }, (error) => {
      console.log(error);
    })
  }


  onClickCat2() {
    this.showCat1div = false;
    this.showCat2div = true;
    this.showCat3div = false;
    this.showCat4div = false;
    this.showCat5div = false;
    this.categorySelected = "Golf Equipment";

    this.productsService.GetProductsByCategory(this.categorySelected).subscribe((response) => {
      this.products = response;
    }, (error) => {
      console.log(error);
    })
  }

  onClickCat3() {
    this.showCat1div = false;
    this.showCat2div = false;
    this.showCat3div = true;
    this.showCat4div = false;
    this.showCat5div = false;
    this.categorySelected = "Mountaineering Equipment";

    this.productsService.GetProductsByCategory(this.categorySelected).subscribe((response) => {
      this.products = response;
    }, (error) => {
      console.log(error);
    })
  }

  onClickCat4() {
    this.showCat1div = false;
    this.showCat2div = false;
    this.showCat3div = false;
    this.showCat4div = true;
    this.showCat5div = false;
    this.categorySelected = "Outdoor Protection";

    this.productsService.GetProductsByCategory(this.categorySelected).subscribe((response) => {
      this.products = response;
    }, (error) => {
      console.log(error);
    })
  }

  onClickCat5() {
    this.showCat1div = false;
    this.showCat2div = false;
    this.showCat3div = false;
    this.showCat4div = false;
    this.showCat5div = true;
    this.categorySelected = "Personal Accessories";

    this.productsService.GetProductsByCategory(this.categorySelected).subscribe((response) => {
      this.products = response;
    }, (error) => {
      console.log(error);
    })
  }




  onQuantityDecrementClick() {
    if (this.viewProductForm.get('quantity').value != 1) {
      this.currentQuantity = Number(this.viewProductForm.get('quantity').value) - 1;
      this.viewProductForm.patchValue({
        quantity: this.currentQuantity
      });
    }
  }

  onQuantityIncrementClick() {
    if (this.viewProductForm.get('quantity').value < this.maxStock) {
      this.currentQuantity = Number(this.viewProductForm.get('quantity').value) + 1;
      this.viewProductForm.patchValue({
        quantity: this.currentQuantity
      });
    }
  }


  //(change) = "onQuantityChange(index)"

  onQuantityChange() {



  }





  onClickViewDetails(index) {
    this.discountAv = this.products[index].discountPercentage;
    if (this.discountAv != 0) {
      this.viewDiscountedPrice = true;
      
      this.price = this.products[index].sellingPrice * (1 - this.discountAv / 100);
      //this.currentCartObject.unitPrice = this.price;
    }
    if (this.discountAv == 0) {
      this.viewDiscountedPrice = false;

      this.price = this.products[index].sellingPrice;
     
    //  this.currentCartObject.unitPrice = this.products[index].sellingPrice;
    }
    this.viewProductForm.reset();
    this.currentIndex = index;
    this.maxStock = this.products[index].stock;
    this.actualSellingPrice = this.price;
    //this.currentCartObject.productID = this.products[index].productID;
    //this.currentCartObject.productName = this.products[index].productName;



    this.viewProductForm.patchValue({
      //id: this.products[index].id,
      //productID: this.products[index].productID,
      productName: this.products[index].productName,
      size: this.products[index].size,
      colour: this.products[index].colour,
      techSpecs: this.products[index].techSpecs,
      discount: this.products[index].discountPercentage,
      sellingPrice: this.price,
      originalPrice: this.products[index].sellingPrice,
      quantity: 1
      //quantity : 
    });



  }


  onClickAddToCart() {
    let x: number;
    this.orderDetailService.GetAllOrderDetails().subscribe((getResponse) => {

      this.orderDetailsForId = getResponse;
      x = this.orderDetailsForId.length;
      console.log(this.orderDetailsForId);
    }, (error) => {
      console.log(error);
    });
    this.currentCartObject.id = x;
    this.currentCartObject.productID = this.products[this.currentIndex].productID;
    console.log(this.currentCartObject.productID);
    this.currentCartObject.productName = this.products[this.currentIndex].productName;
    console.log(this.currentCartObject.productName);
    this.currentCartObject.quantity = this.viewProductForm.get('quantity').value;
    console.log(this.currentCartObject.quantity);
    this.currentCartObject.unitPrice = this.actualSellingPrice;
    console.log(this.currentCartObject.unitPrice);
    this.currentCartObject.totalPrice = this.currentCartObject.quantity * this.currentCartObject.unitPrice;
    console.log(this.currentCartObject.totalPrice);
    this.currentCartObject.status = "In Cart";

    
   

    this.orderDetailService.AddOrderDetail(this.currentCartObject).subscribe((addResponse) => {
      this.orderDetailService.GetAllOrderDetails().subscribe((getResponse) => {

        this.orderDetails = getResponse;
        console.log(this.orderDetails);
      }, (error) => {
        console.log(error);
      });
    },
      (error) => {
        console.log(error);
      
      });

  }

  //onEditSupplierClick(index) {
  //  this.editSupplierForm.reset();
  //  this.editSupplierForm["submitted"] = false;
  //  this.editSupplierForm.patchValue({
  //    id: this.suppliers[index].id,
  //    supplierID: this.suppliers[index].supplierID,
  //    supplierName: this.suppliers[index].supplierName,
  //    supplierMobile: this.suppliers[index].supplierMobile,
  //    email: this.suppliers[index].email,
  //    password: this.suppliers[index].password,
  //    creationDateTime: this.suppliers[index].creationDateTime
  //  });
  //}



  //suppliers: Supplier[] = [];
  //showSuppliersSpinner: boolean = false;
  //viewSupplierCheckBoxes: any;

  //sortBy: string = "supplierName";
  //sortDirection: string = "ASC";

  //newSupplierForm: FormGroup;
  //newSupplierDisabled: boolean = false;
  //newSupplierFormErrorMessages: any;

  //editSupplierForm: FormGroup;
  //editSupplierDisabled: boolean = false;
  //editSupplierFormErrorMessages: any;

  //deleteSupplierForm: FormGroup;
  //deleteSupplierDisabled: boolean = false;

  //constructor(private suppliersService: SuppliersService) {
  //  super();
  //  this.newSupplierForm = new FormGroup({
  //    supplierName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
  //    supplierMobile: new FormControl(null, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]),
  //    email: new FormControl(null, [Validators.required, Validators.email]),
  //    password: new FormControl(null, [Validators.required, Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/)])
  //  });

  //  this.newSupplierFormErrorMessages = {
  //    supplierName: { required: "Supplier Name can't be blank", minlength: "Supplier Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },
  //    supplierMobile: { required: "Mobile number can't be blank", pattern: "10 digit Mobile number is required" },
  //    email: { required: "Email can't be blank", pattern: "Email is invalid" },
  //    password: { required: "Password can't be blank", pattern: "Password should contain should be between 6 to 15 characters long, with at least one uppercase letter, one lowercase letter and one digit" }
  //  };



  //  this.editSupplierForm = new FormGroup({
  //    id: new FormControl(null),
  //    supplierID: new FormControl(null),
  //    supplierName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
  //    supplierMobile: new FormControl(null, [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]),
  //    email: new FormControl(null, [Validators.required, Validators.email]),
  //    password: new FormControl(null),
  //    creationDateTime: new FormControl(null)
  //  });

  //  this.editSupplierFormErrorMessages = {
  //    supplierName: { required: "Supplier Name can't be blank", minlength: "Supplier Name should contain at least 2 characters", maxlength: "Supplier Name can't be longer than 40 characters" },
  //    supplierMobile: { required: "Mobile number can't be blank", pattern: "10 digit Mobile number is required" },
  //    email: { required: "Email can't be blank", pattern: "Email is invalid" }
  //  };

  //  this.viewSupplierCheckBoxes = {
  //    supplierName: true,
  //    mobile: true,
  //    email: true,
  //    createdOn: true,
  //    lastModifiedOn: true
  //  };

  //  this.deleteSupplierForm = new FormGroup({
  //    id: new FormControl(null),
  //    supplierID: new FormControl(null),
  //    supplierName: new FormControl(null)
  //  });
  //}

  //ngOnInit() {
  //  this.showSuppliersSpinner = true;
  //  this.suppliersService.GetAllSuppliers().subscribe((response) => {
  //    this.suppliers = response;
  //    this.showSuppliersSpinner = false;
  //  }, (error) => {
  //      console.log(error);
  //    })
  //}

  //onCreateSupplierClick() {
  //  this.newSupplierForm.reset();
  //  this.newSupplierForm["submitted"] = false;
  //}

  //onAddSupplierClick(event) {
  //  this.newSupplierForm["submitted"] = true;
  //  if (this.newSupplierForm.valid) {
  //    this.newSupplierDisabled = true;
  //    var supplier: Supplier = this.newSupplierForm.value;

  //    this.suppliersService.AddSupplier(supplier).subscribe((addResponse) => {
  //      this.newSupplierForm.reset();
  //      $("#btnAddSupplierCancel").trigger("click");
  //      this.newSupplierDisabled = false;
  //      this.showSuppliersSpinner = true;

  //      this.suppliersService.GetAllSuppliers().subscribe((getResponse) => {
  //        this.showSuppliersSpinner = false;
  //        this.suppliers = getResponse;
  //      }, (error) => {
  //          console.log(error);
  //        });
  //    },
  //      (error) => {
  //        console.log(error);
  //        this.newSupplierDisabled = false;
  //      });
  //  }
  //  else {
  //    super.getFormGroupErrors(this.newSupplierForm);
  //  }
  //}



  //getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
  //  return {
  //    'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
  //    'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
  //  };
  //}

  //getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
  //  return this.newSupplierFormErrorMessages[formControlName][validationProperty];
  //}

  //getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
  //  return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  //}



  //onEditSupplierClick(index) {
  //  this.editSupplierForm.reset();
  //  this.editSupplierForm["submitted"] = false;
  //  this.editSupplierForm.patchValue({
  //    id: this.suppliers[index].id,
  //    supplierID: this.suppliers[index].supplierID,
  //    supplierName: this.suppliers[index].supplierName,
  //    supplierMobile: this.suppliers[index].supplierMobile,
  //    email: this.suppliers[index].email,
  //    password: this.suppliers[index].password,
  //    creationDateTime: this.suppliers[index].creationDateTime
  //  });
  //}

  //onUpdateSupplierClick(event) {
  //  this.editSupplierForm["submitted"] = true;
  //  if (this.editSupplierForm.valid) {
  //    this.editSupplierDisabled = true;
  //    var supplier: Supplier = this.editSupplierForm.value;

  //    this.suppliersService.UpdateSupplier(supplier).subscribe((updateResponse) => {
  //      this.editSupplierForm.reset();
  //      $("#btnUpdateSupplierCancel").trigger("click");
  //      this.editSupplierDisabled = false;
  //      this.showSuppliersSpinner = true;

  //      this.suppliersService.GetAllSuppliers().subscribe((getResponse) => {
  //        this.showSuppliersSpinner = false;
  //        this.suppliers = getResponse;
  //      }, (error) => {
  //          console.log(error);
  //        });
  //    },
  //      (error) => {
  //        console.log(error);
  //        this.editSupplierDisabled = false;
  //      });
  //  }
  //  else {
  //    super.getFormGroupErrors(this.editSupplierForm);
  //  }
  //}



  //onDeleteSupplierClick(index) {
  //  this.deleteSupplierForm.reset();
  //  this.deleteSupplierForm["submitted"] = false;
  //  this.deleteSupplierForm.patchValue({
  //    id: this.suppliers[index].id,
  //    supplierID: this.suppliers[index].supplierID,
  //    supplierName: this.suppliers[index].supplierName
  //  });
  //}

  //onDeleteSupplierConfirmClick(event) {
  //  this.deleteSupplierForm["submitted"] = true;
  //  if (this.deleteSupplierForm.valid) {
  //    this.deleteSupplierDisabled = true;
  //    var supplier: Supplier = this.deleteSupplierForm.value;

  //    this.suppliersService.DeleteSupplier(supplier.supplierID, supplier.id).subscribe((deleteResponse) => {
  //      this.deleteSupplierForm.reset();
  //      $("#btnDeleteSupplierCancel").trigger("click");
  //      this.deleteSupplierDisabled = false;
  //      this.showSuppliersSpinner = true;

  //      this.suppliersService.GetAllSuppliers().subscribe((getResponse) => {
  //        this.showSuppliersSpinner = false;
  //        this.suppliers = getResponse;
  //      }, (error) => {
  //          console.log(error);
  //        });
  //    },
  //      (error) => {
  //        console.log(error);
  //        this.deleteSupplierDisabled = false;
  //      });
  //  }
  //  else {
  //    super.getFormGroupErrors(this.deleteSupplierForm);
  //  }
  //}



  //onViewSelectAllClick() {
  //  for (let propertyName of Object.keys(this.viewSupplierCheckBoxes)) {
  //    this.viewSupplierCheckBoxes[propertyName] = true;
  //  }
  //}

  //onViewDeselectAllClick() {
  //  for (let propertyName of Object.keys(this.viewSupplierCheckBoxes)) {
  //    this.viewSupplierCheckBoxes[propertyName] = false;
  //  }
  //}

  //onBtnSortClick() {
  //  console.log(this.sortBy);
  //  this.suppliers.sort((a, b) => {
  //    let comparison = 0;
  //    let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
  //    let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

  //    if (value1 < value2) {
  //      comparison = -1;
  //    }
  //    else if (value1 > value2) {
  //      comparison = 1;
  //    }
  //    if (this.sortDirection == "DESC")
  //      comparison = comparison * -1;

  //    console.log(value1, value2, comparison);
  //    return comparison;
  //  });

  //}
}



