import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent implements OnInit {
  formGroup!:FormGroup
  constructor (public dialogRef: MatDialogRef<ListaUsuariosComponent>,
  private userService:UserService,
  @Inject(MAT_DIALOG_DATA) public data: User,
  private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
      if(this.data){
      this.formGroup=this.formBuilder.group({
        username:[this.data.username,Validators.required],
        name:[this.data.name,Validators.required],
        lastName:[this.data.lastName||"",Validators.required],
        email:[this.data.email||"",Validators.required],
        phone:[this.data.phone||"",Validators.required],
        role:[this.data.role||"",Validators.required],
        password:[this.data.password||"",Validators.required],
        });
      }else{
        this.formGroup=this.formBuilder.group({
          username:["",Validators.required],
          name:["",Validators.required],
          lastName:["",Validators.required],
          email:["",Validators.required],
          phone:["",Validators.required],
          role:["",Validators.required],
          password:["",Validators.required],
          });
      }
      }

      save(): void{
        let request={
          id:this.data!=null?this.data._id:null,
          username:this.formGroup.value.username,
          name: this.formGroup.value.name,
          lastName: this.formGroup.value.lastName,
          email: this.formGroup.value.email,
          phone: this.formGroup.value.phone,
          role: this.formGroup.value.role,
          password: this.formGroup.value.password,
        }

        try{
          if(!this.data){
            this.userService.createUser(request).subscribe(item=>console.log(item))
          }else{
            this.userService.updateUser(request).subscribe(item=>console.log(item)
            )
          }
          this.dialogRef.close(true)
        }catch(error){
          console.log(error);

        }
      }
}
