export class Product {
  id: number;
  productID: string;
  productCode: string;
  productName: string;
  category: string;
  image: string;
  stock: number;
  size: string;
  colour: string;
  techSpecs: string;
  costPrice: number;
  sellingPrice: number;
  discountPercentage: number;

  constructor(ID: number, ProductID: string, ProductCode: string, ProductName: string, Category: string, Image: string, Stock: number, Size: string,
    Colour: string, TechSpecs: string, CostPrice: number, SellingPrice: number, DiscountPercentage: number) {
    this.id = ID;
    this.productID = ProductID;
    this.productCode = ProductCode;
    this.productName = ProductName;
    this.category = Category;
    this.image = Image;
    this.stock = Stock;
    this.size = Size;
    this.colour = Colour;
    this.techSpecs = TechSpecs;
    this.costPrice = CostPrice;
    this.sellingPrice = SellingPrice;
    this.discountPercentage = DiscountPercentage;

  }
}
