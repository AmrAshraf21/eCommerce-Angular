import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service';
import { CartService } from '../service/cart-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {
  
  productService = inject(ProductService);
  cartItems = this.productService.cartItems;
  router = inject(Router);

  get totalPrice() {
    return this.cartItems().reduce((sum:number, item:any) => sum + item.price,0);
  }

  removeItem(productId: number) {
    this.productService.removeFromCart(productId);
  }

  clearCart() {
    this.productService.clearCart();
  }

  checkout() {
    // Implement your checkout logic
    alert('Order placed successfully!');
    this.clearCart();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    
  }

}
