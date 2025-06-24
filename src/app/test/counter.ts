import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Counter {

  private _count = 0;


private httpClient = inject(HttpClient);
 getPosts(){
  return this.httpClient.get('https://jsonplaceholder.typicode.com/posts');
}

  get count(){
    return this._count
  }
  inc(){
    this._count++;
  }
  dec(){
    this._count--;
  }
}
