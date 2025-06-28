import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoundPricePipePipe } from '../Pipes/round-price-pipe-pipe';
import { CartService } from '../service/cart-service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,RouterModule,RoundPricePipePipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {

  ngOnInit(): void {
    
  }
 
productService = inject(ProductService);

totalCartPrice = computed(() => {
  return this.productService.cartItems().reduce((total, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return total + price * quantity;
  }, 0).toFixed(2);
});
 
  increaseQuantity(item): void {
    if (item.quantity < item.stock) { 
        const newQuantity = (item.quantity ?? 0) + 1;
        this.productService.addToCart({ ...item, quantity: newQuantity });
    }
  }

  
  decreaseQuantity(item): void {
    if (item.quantity > 1) { 
      const newQuantity = (item.quantity??0) - 1;
      this.productService.addToCart({ ...item, quantity: newQuantity });
    } else {
     
      this.removeItem(item.id);
    }
  }

  
  removeItem(productId: number): void {
    this.productService.removeFromCart(productId);
  }

  
  clearCart(): void {
    this.productService.clearCart();
  }

  proceedToCheckout(): void {
    alert('Proceeding to Checkout!');
  }
}

