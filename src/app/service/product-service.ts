import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products = signal<any>([]);

  private readonly CART_KEY = 'user_cart';

  private httpClient = inject(HttpClient);

  cartItems = signal<any>(this.getSavedCartItems());


  cartCount = computed(()=>{
    return this.cartItems().length > 0 ? this.cartItems().length : 0;
  })

  getProducts() {
    return this.httpClient.get('https://dummyjson.com/products');
  }

  getProductsById(id: number) {
    
    return this.httpClient.get(`https://dummyjson.com/products/${id}`);
  }



  addToCart(product: any) {
    this.cartItems.update(prev => {
      const newCart = [...prev, product];
      this.saveCartItems(newCart);
      return newCart;
    })
  }

  removeFromCart(productId: number) {
    this.cartItems.update(prev => {
      const newCart = prev.filter((item: any) => item.id !== productId);
      this.saveCartItems(newCart);
      return newCart;
    });
  }

  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem(this.CART_KEY);
  }

  private saveCartItems(items: any) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }

  private getSavedCartItems() {
    const saved = localStorage.getItem(this.CART_KEY);
    return saved ? JSON.parse(saved) : [];
  }
}
