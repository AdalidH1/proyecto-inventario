import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductosService } from '../service/productos.service';

import { Product } from '../models/product';
import { MatDialog } from '@angular/material/dialog';

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
