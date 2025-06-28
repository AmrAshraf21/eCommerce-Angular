import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  productService = inject(ProductService);
  private readonly CART_KEY = 'cart_products';
  private cartItems = signal<any>(this.productService.getSavedCartItems());


  get cart() {

    return this.cartItems;
  }


 cartCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  getCart() {
    return this.cartItems.asReadonly();
  }

  getCartItem(productId: number) {
    return this.cartItems().find(item => item.id === productId);
  }




}
