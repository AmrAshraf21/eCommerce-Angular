import { Component, inject, input, numberAttribute, signal } from '@angular/core';
import { ProductService } from '../service/product-service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {

  productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  product = signal<any>({});

subscription!:Subscription;

  math = Math;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.subscription = this.productService.getProductsById(Number(productId)).subscribe({
      next: (data: any) =>{
        
        
        
        this.product.set(data);
        console.log(this.product().reviews.length);

      } ,
      error: err => console.error("Falied", err)
    
  })

  
  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
