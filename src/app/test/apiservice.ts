import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIService {


private cartCount = signal(0);

readonly cartCount$ = this.cartCount.asReadonly();


increment(){
  this.cartCount.update(v=>v+1);
}

getCardCount(){
  return this.cartCount$();
}

}
