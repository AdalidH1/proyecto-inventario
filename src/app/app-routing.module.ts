import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';
import { CardProductComponent } from './card-product/card-product.component';


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ListaProductosComponent },
  { path: 'usuarios', component: ListaUsuariosComponent },
  { path: 'products', component: CardProductComponent },
  { path: '**', redirectTo: '/inicio' }  // Ruta comodín para URLs no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }