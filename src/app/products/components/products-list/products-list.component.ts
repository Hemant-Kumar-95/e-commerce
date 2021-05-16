import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { SelectCategory } from '../../models/select-category.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  productsMaster: Product[];
  categoriesMaster: Category[];
  products: Product[];
  filteredCategories: SelectCategory[];
  searchText: string;
  filteredCategoryIds;

  constructor(
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  applyFilter() {
    this.filteredCategoryIds = this.filteredCategories.filter(fc => fc.isSelected).map(fc => fc.id);
    this.search();
  }

  search() {
    if (this.searchText) {
      this.products = this.productsMaster.filter(x =>
        this.filteredCategoryIds.includes(x.categoryId)
        && (x.name.toLowerCase().includes(this.searchText.toLowerCase())
          || x.description.toLowerCase().includes(this.searchText.toLowerCase())));
    } else {
      this.products = this.productsMaster
        .filter(x => this.filteredCategoryIds.includes(x.categoryId));
    }
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe((result: Product[]) => {
        this.productsMaster = result;
        this.productsMaster.forEach(x => x.categoryName = this.categoriesMaster.find(c => c.id === x.categoryId).name);
        this.applyFilter();
      }, (error) => { });
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe((result: Category[]) => {
        this.categoriesMaster = result;
        this.filteredCategories = this.categoriesMaster.map(x =>
          new SelectCategory({
            id: x.id,
            name: x.name,
            isSelected: true
          }));
        this.getProducts();
      }, (error) => { });
  }

  onProductCardClick(product: Product) {
    this.router.navigate(['products', product.id])
  }
}
