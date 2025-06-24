import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { A } from "./a/a";
import { B } from './b/b';
import { Counter } from './test/counter';
import { Navbar } from "./navbar/navbar";
import { Product } from "./product/product";

import { Products } from "./products/products";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Product, Products],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'services';


  // this recommended
  // private logger = inject(Logger);
  constructor() {
    // this.logger.log("Testing")
  }


  //1- don't recommend 
  // constructor(private logger:Logger){
  //   this.logger.log("Hello world");
  // }



  counter = inject(Counter);
}
