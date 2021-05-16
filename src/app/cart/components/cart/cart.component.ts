import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product.service';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    if (cart) {
      cart.forEach(x => {
        this.productService.getProductbyId(x.productId)
          .subscribe((product: Product) => {
            x.product = product;
          });
      })
    }
    this.cart = cart;
  }

  onRemoveItem(index: number): void {
    this.cartService.removeProduct(this.cart[index].productId);
    this.cart.splice(index, 1);
  }

  onAmountChange(item: CartItem, quantity: number): void {
    this.cartService.updateQuantity(item.productId, quantity);
  }

  getToalAmount(): number {
    return this.cart.map(x => (x.product?.price || 0) * x.quantity).reduce((x, y) => x + y);
  };

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
