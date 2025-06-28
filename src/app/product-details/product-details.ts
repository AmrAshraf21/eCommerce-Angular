import { Component, inject, input, numberAttribute, signal } from '@angular/core';
import { ProductService } from '../service/product-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart-service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe,RouterModule,CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss'
})
export class ProductDetails {

   productService = inject(ProductService);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  
  product = signal<any>({});
  
  quantity = signal<number>(0);

  private subscription!: Subscription;

  math = Math;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');

    this.subscription = this.productService.getProductsById(Number(productId)).subscribe({
      next: (data:any) => {
        this.product.set(data);
        
        const cartItem = this.productService.getCartItem(data.id);
        this.quantity.set( cartItem?.quantity ?? 0);
      },
      error: err => {
        console.error('Error fetching product details:', err);
        this.router.navigate(['/products']);
      }
    });
  }

  
  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
  
    return Array(fullStars).fill(0);
  }

  increaseQuantity() {
    
    console.log(this.quantity());
    console.log(this.product());
  
    const currentProduct = this.product();
    if (currentProduct && this.quantity() < currentProduct.stock) {
      this.quantity.update(q => q + 1);
      this.updateCart();
    }
  }

  decreaseQuantity() {
    
    if (this.quantity() > 0) {
      this.quantity.update(q => q - 1);
      this.updateCart(); 
    }
  }

  
  private updateCart() {
    const currentProduct = this.product();
    const currentQuantity = this.quantity();

  
    if (currentQuantity > 0) {
      this.productService.addToCart({
        ...currentProduct,
        quantity: currentQuantity
      });
    } else {
  
      this.productService.removeFromCart(currentProduct.id);
    }
  }

  
  addToCartClicked() {
    if (this.product() && this.quantity() === 0 && this.product()!.stock > 0) {
  
      this.quantity.set(1);
      this.updateCart();
    } else if (this.quantity() > 0) {
  
      this.updateCart();
    }
  
  
  }

  


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
