import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProductosService } from '../service/productos.service';

import { Product } from '../models/product';
import { MatDialog } from '@angular/material/dialog';
import { FormProductsComponent } from '../form-products/form-products.component';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  productList!: MatTableDataSource<Product>;
  columnsHeader=["date","name","price","amount","status","opciones"]
  
  
  constructor(private productService:ProductosService,
  public dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
  this.productListMethod();
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormProductsComponent, {
      data: null,
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('the dialog was closed')
      if (result) {
        this.productListMethod()
      }
    })
  }

  deleteDialog(id:string) {
    const dialogRef = this.dialog.open(ModalEliminarComponent, {
      data: null,
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('the dialog was closed')
      if (result) {
        this.deleteProduct(id)
      }
    })
  }

  deleteProduct(id:string){
    try{
    this.productService.delete(id).subscribe(item=>console.log(item))
    this.productListMethod();
  
    }catch(error){
      console.log(error)
    }
  }

  editDialog(element:Product) {
    const dialogRef = this.dialog.open(FormProductsComponent, {
      data: element,
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('the dialog was closed')
      if (result) {
        this.productListMethod()
      }
    })
  }

  
  productListMethod(){
  try{
  this.productService.getProducts()
  .subscribe(item => this.productList= new MatTableDataSource(item))
  
  }catch(error){
  console.log(error)
  }
  
  }
  
  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  
  this.productList.filter=filterValue.trim();
  
  }
}
