import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from "./validators/password-validator";
import { phoneValidator } from './validators/phone-validator';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hero = { id: "1", name: "AA" };
  formGroup!: FormGroup;
  value = 'hola';
  hide = true;

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  constructor(private formBuilder: FormBuilder, private userService:UserService ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      // name: ["", Validators.required],
      // lastName: ["", Validators.required],
      // age: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      // phone: ["", [Validators.required, phoneValidator()]],
      password: ["", [Validators.required, passwordValidator()]],
      // status: ["", Validators.required]
    });
  }

  get f() {
    return this.formGroup.controls;
  }
  // submit(){
  //   console.log(this.formGroup.value)
  //   this.userService.addData(this.formGroup.value)
  // }
}
