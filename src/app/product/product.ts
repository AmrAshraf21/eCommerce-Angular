import { AfterViewInit, Component, inject, Input, input, OnInit, signal } from '@angular/core';
import { APIService } from '../test/apiservice';
import { single } from 'rxjs';
import { ProductService } from '../service/product-service';
import { Router, RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [RouterModule,CurrencyPipe],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product {


  productService = inject(ProductService);
  router = inject(Router);
  product = input<IProduct>();


 
  addTocCart(prod: any) {
    this.productService.products.update(prev => [...prev, prod]);
    this.productService.addToCart(prod);
  }

// navigateToDetails(){
// this.router.navigate(['/products',this.product()?.id])
// }

}

interface IProduct{
  id:number,
  thumbnail:string,
  title:string,
  price:number,
  description:string
  stock:number
}

