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

  
  cartCount = computed(() => {
    return this.cartItems().length;
  });

  
  totalCartQuantity = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  
  getProducts() {
    return this.httpClient.get('https://dummyjson.com/products');
  }


  getProductsById(id: number) {
    return this.httpClient.get(`https://dummyjson.com/products/${id}`);
  }

  addToCart(productToAdd) {
    this.cartItems.update(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productToAdd.id);

      if (existingItemIndex > -1) {
        // If item exists, update its quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: productToAdd.quantity
        };
        this.saveCartItems(newItems);
        return newItems;
      } else {
        // If item does not exist, add it
        const newItems = [...prevItems, { ...productToAdd }];
        this.saveCartItems(newItems);
        return newItems;
      }
    });
  }


  removeFromCart(productId: number) {
    this.cartItems.update(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      this.saveCartItems(newItems);
      return newItems;
    });
  }


  getCartItem(productId: number) {
    return this.cartItems().find(item => item.id === productId);
  }


  clearCart() {
    this.cartItems.set([]);
    localStorage.removeItem(this.CART_KEY);
  }


  private saveCartItems(items) {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }


   getSavedCartItems() {
    const saved = localStorage.getItem(this.CART_KEY);
    return saved ? JSON.parse(saved) : [];
  }




}
