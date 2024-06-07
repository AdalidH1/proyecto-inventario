import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from '../service/productos.service';
import { Product } from '../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit{

  formGroup!:FormGroup
  constructor (public dialogRef: MatDialogRef<ProductosService>, @Inject(MAT_DIALOG_DATA) public data: Product,
  private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
      if(!this.data){
      this.formGroup=this.formBuilder.group({
      name:["",Validators.required],
      code:["",Validators.required],
      category:["",Validators.required],
      description:["",Validators.required],
      price:["",Validators.required],
      amount:["",Validators.required]
      });
      }else{
      this.formGroup=this.formBuilder.group({
      name:[this.data.name||"",Validators.required],
      code:[this.data.code||"",Validators.required],
      category:[this.data.category||"",Validators.required],
      description:[this.data.description||"",Validators.required],
      price:[this.data.price||"",Validators.required],
      amount:[this.data.amount||"",Validators.required]
      });
      }
      
      
      }
}
