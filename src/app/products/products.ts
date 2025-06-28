import { Component, inject, OnInit, signal } from '@angular/core';
import { APIService } from '../test/apiservice';
import { Product } from "../product/product";
import { ProductService } from '../service/product-service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [Product, RouterOutlet],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {


  productService = inject(ProductService);
  arrOfProducts = signal([]);


  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.arrOfProducts.set(data.products);

      }
      ,
      error: err => console.error("Falied", err)

    });
  }

  ngOnInit(): void {

    this.fetchProducts();

  }



}
