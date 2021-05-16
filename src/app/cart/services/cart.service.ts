import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartItem[] = [];

  addProduct(productId: number, quantity: number) {
    const existingProduct = this.cart.find(x => x.productId === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.push(new CartItem({ productId, quantity }));
    }
  }

  updateQuantity(productId: number, quantity: number) {
    const existingProduct = this.cart.find(x => x.productId === productId);
    existingProduct.quantity = quantity;
  }

  removeProduct(productId: number) {
    const product = this.cart.find(x => x.productId === productId);
    const index = this.cart.indexOf(product);
    this.cart.splice(index, 1);
  }

  getCart(): CartItem[] {
    return [...this.cart];
  }

  emptyCart(): void {
    this.cart = [];
  }
}
