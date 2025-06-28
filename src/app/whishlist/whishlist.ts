import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistStore } from '../store/WishlistStore.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whishlist',
  imports: [RouterModule,CommonModule],
  templateUrl: './whishlist.html',
  styleUrl: './whishlist.scss'
})
export class Whishlist {

  wishlist = inject(WishlistStore);
  
  // wishlistArray = this.wishlist.wishlistItems();
  



  
  removeItem(productId: number) {
    console.log(productId);
    
    this.wishlist.removeFromWishlist(productId);
  }

}
