import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { DetailServiceService } from '../service/detail-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carritoItems$!: Observable<Product[]>;
  total$!: Observable<number>;

  constructor(private carritoService: DetailServiceService) { }

  ngOnInit(): void {
    this.carritoItems$ = this.carritoService.getCarritoItems();
    this.total$ = this.carritoService.getTotal();
  }

  removeItem(product: Product) {
    this.carritoService.removeFromCarrito(product);
  }
}
