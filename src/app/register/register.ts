import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import matchPassword from '../validators/match-fields.validator';

import { JsonPipe } from '@angular/common';
import { matchFields } from '../validators/match-fields.validator';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  
  imports: [ReactiveFormsModule,JsonPipe,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit {

  registrationForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {


    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      username: ['', [Validators.required, Validators.pattern(/^\S+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      addresses: this.fb.array([])

    }, {
      validator: matchFields('password', 'confirmPassword')
    })

    // this.registrationForm = new FormGroup({
    //   name:new FormControl(null,[Validators.required]),
    // email:new FormControl(null,[Validators.required,Validators.email,Validators.pattern('^[a-z0-9]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    // username:new FormControl(null,[Validators.required,Validators.pattern(/^\S+$/)]),
    // password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    // confirmPassword:new FormControl(null,Validators.required)
    // },{validators : passwordMatchValidator})
  }


  get Address() {
    return this.registrationForm.get('addresses') as FormArray
  }

  get NameProp() {
    return this.registrationForm.get('name');
  }

  get EmailProp() {
    return this.registrationForm.get('email');
  }
  get UsernameProp() {
    return this.registrationForm.get('username')
  }
  get PasswordProp() {
    return this.registrationForm.get('password');
  }
  get ConfirmPassword() {
    return this.registrationForm.get('confirmPassword')
  }

  // or making a function path to it the property name in the template 

  getProp(name: string) {
    return this.registrationForm.get(name);
  }

  newAddress():FormGroup{
    return this.fb.group({
      address:['',Validators.required],
        country:['',Validators.required],
        city:['',Validators.required],
        street:['',Validators.required],
    });
  }

  onAddNewAddress() {
    this.Address.push(this.newAddress());
  }
  onDeleteAddress(index : number){
    this.Address.removeAt(index);
  }


  submit() {
    console.log(this.registrationForm.value);

  }




}
