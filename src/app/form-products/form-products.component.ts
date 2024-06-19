import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from '../service/productos.service';
import { Product } from '../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListaProductosComponent } from '../lista-productos/lista-productos.component';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit{

  formGroup!:FormGroup
  constructor (public dialogRef: MatDialogRef<ListaProductosComponent>,
  private productService:ProductosService,
  @Inject(MAT_DIALOG_DATA) public data: Product,
  private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
      this.initForm()
    }
    initForm(){
      if(this.data){
      this.formGroup=this.formBuilder.group({
        name:[this.data.name,Validators.required],
        code:[this.data.code||"",Validators.required],
        category:[this.data.category||"",Validators.required],
        description:[this.data.description||"",Validators.required],
        price:[this.data.price||"",Validators.required],
        amount:[this.data.amount||"",Validators.required]
        });
      }else{
        this.formGroup=this.formBuilder.group({
          name:["",Validators.required],
          code:["",Validators.required],
          category:["",Validators.required],
          description:["",Validators.required],
          price:["",Validators.required],
          amount:["",Validators.required]
          });
      }
      }

      save(): void{
        let request={
          id:this.data!=null?this.data._id:null,
          name: this.formGroup.value.name,
          code: this.formGroup.value.code,
          category: this.formGroup.value.category,
          description: this.formGroup.value.description,
          price: this.formGroup.value.price,
          amount: this.formGroup.value.amount,
        }

        try{
          if(!this.data){
            this.productService.addProduct(request).subscribe(item=>console.log(item))
          }else{
            this.productService.editProduct(request).subscribe(item=>console.log(item)
            )
          }
          this.dialogRef.close(true)
        }catch(error){
          console.log(error);

        }
      }
}
