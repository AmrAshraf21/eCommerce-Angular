import { Component, inject } from '@angular/core';

import { APIService } from '../test/apiservice';
import { ProductService } from '../service/product-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  items = "test";

  productService = inject(ProductService);



}
