import { Product } from 'src/app/products/models/product.model';

export class CartItem {
  constructor(obj?) {
    if (obj) {
      this.productId = obj.productId;
      this.quantity = obj.quantity;
    }
  }
  productId: number;
  quantity: number;
  product: Product;
}
