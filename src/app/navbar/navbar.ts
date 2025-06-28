import { Component, inject } from '@angular/core';

import { APIService } from '../test/apiservice';
import { ProductService } from '../service/product-service';
import { RouterModule } from '@angular/router';
import { WishlistStore } from '../store/WishlistStore.store';
import { CartService } from '../service/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  items = "test";

  productService = inject(ProductService);
cartService = inject(CartService);
  cartCount = this.cartService.cart;
  wishlistStore = inject(WishlistStore);


}
