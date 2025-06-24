import { inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


private productService = inject(ProductService);
  private readonly CART_KEY = 'cart_products';
  

  private cartItems = signal<any>(this.getSavedCartItems());


   get cart() {
    return this.cartItems;
  }

  addToCart(product: any) {
    this.cartItems().push(product);
    this.saveCartItems();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems().filter((item:any) => item.id !== productId);
    this.saveCartItems();
  }

  clearCart() {
    this.cartItems.update(_=>[]);
    this.saveCartItems();
  }

  private saveCartItems() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartItems()));
  }

  private getSavedCartItems(){
    const savedItems = localStorage.getItem(this.CART_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  }

}
