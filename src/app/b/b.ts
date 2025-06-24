import { Component } from '@angular/core';
import { Counter } from '../test/counter';

@Component({
  selector: 'app-b',
  imports: [],
  templateUrl: './b.html',
  styleUrl: './b.scss'
})
export class B {


  constructor(public counterService: Counter) { }

  add() {
    this.counterService.inc();
  }
  min() {
    this.counterService.dec()
  }
}
