import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './login/login.component';
import { CardProductComponent } from './card-product/card-product.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ListaProductosComponent, canActivate:[AuthGuard] },
  { path: 'usuarios', component: ListaUsuariosComponent, canActivate:[AuthGuard] },
  { path: 'tienda', component: CardProductComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '/login' }  // Ruta comodín para URLs no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }