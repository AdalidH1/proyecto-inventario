import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { FormUsersComponent } from '../form-users/form-users.component';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  userList!: MatTableDataSource<User>;
  columnsHeader=["date","name","lastName","email","phone","role","status", "opciones"]
  
  
  constructor(private userService:UserService,
  public dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
  this.userListMethod();
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormUsersComponent, {
      data: null,
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('the dialog was closed')
      if (result) {
        this.userListMethod()
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
        this.deleteUser(id)
      }
    })
  }

  deleteUser(id:string){
    try{
    this.userService.deleteUser(id).subscribe(item=>console.log(item))
    this.userListMethod();
  
    }catch(error){
      console.log(error)
    }
  }

  editDialog(element:User) {
    const dialogRef = this.dialog.open(FormUsersComponent, {
      data: element,
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('the dialog was closed')
      if (result) {
        this.userListMethod()
      }
    })
  }

  
  userListMethod(){
  try{
  this.userService.getUsers()
  .subscribe(item => this.userList= new MatTableDataSource(item))
  
  }catch(error){
  console.log(error)
  }
  
  }
  
  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  
  this.userList.filter=filterValue.trim();
  
  }
}
