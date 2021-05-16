import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/cart/services/cart.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  product: Product;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.getProductById(id);
    })
  }

  getProductById(id: number) {
    this.productService.getProductbyId(id).subscribe((result: Product) => {
      this.product = result;
    });
  }

  addItemToCart(productId: number) {
    this.cartService.addProduct(productId, this.quantity);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added to cart successfully.' });
    this.router.navigate(['/']);
  }
}
