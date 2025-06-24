import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {



  loginSubmit(f:NgForm){
    console.log(f);
    
  }

}
