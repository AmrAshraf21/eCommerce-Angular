import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Counter } from '../test/counter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-a',
  imports: [],
  templateUrl: './a.html',
  styleUrl: './a.scss',
  providers: [Counter]
})
export class A {
  counterService = inject(Counter);
  private sub!: Subscription
  posts!: any
  count = signal(5);


  ngOnInit() {

    this.count.set(4);
  }


  // ngOnInit(): void {
  //  this.sub= this.counterService.getPosts().subscribe({
  //     next: data => { this.posts = data }
  //   })
  // }

  // ngOnDestroy(): void {
  //     this.sub.unsubscribe();
  // }
  add() {
    // this.counterService.inc();
    this.count.set(this.count() + 1);
    this.count.update(prev => prev + 1);
  }
  min() {
    // this.count--;

    this.count.set(this.count() - 1);
  }
}
