import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../service/productos.service';
import { Product } from '../models/product';
import { DetailServiceService } from '../service/detail-service.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {

  products!: Product[];
  constructor(private productService:ProductosService,
    
    private carritoService: DetailServiceService
  ) {}
  ngOnInit(): void {
    this.productListMethod();
    }
  productListMethod(){
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
}

addToCarrito(product: Product): void {
  this.carritoService.addToCarrito(product);
}
}
