import { AfterViewInit, Component, computed, inject, Input, input, OnInit, signal } from '@angular/core';
import { APIService } from '../test/apiservice';
import { single } from 'rxjs';
import { ProductService } from '../service/product-service';
import { Router, RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { WishlistStore } from '../store/WishlistStore.store';

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
  wishlistSignalStore = inject(WishlistStore)

  isInWishlist = computed(()=>this.wishlistSignalStore.wishlistItems().some(x=>x.id === this.product().id))

  // addTocCart(prod: any) {
  //   this.productService.products.update(prev => [...prev, prod]);
  //   this.productService.addToCart(prod);
  // }
  addTocCart(prod: any) {
  const productWithQuantity = {
    ...prod,
    quantity: 1
  };

  this.productService.addToCart(productWithQuantity);
}
  toggleSwitch(){
    this.wishlistSignalStore.toggleItem(this.product());
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

