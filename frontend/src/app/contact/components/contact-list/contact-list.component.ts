import { Component, OnInit } from '@angular/core';
import { Contact, ContactService } from '../../../contacts/service/contact.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
contacts: Contact[] = [];      //guardamos el array de contactos
editID: number | null = null; //id del contacto que estamos editando
name = '';                   //campos auxiliares para editar
email = '';
phone = '';
loading = false;           //flag para desactivar botones

constructor(private svc: ContactService){}

//se ejecuta cuando el componente se inicia por primera vez
ngOnInit(){
  this.load();         //lanza la carga inical de contactos
}
//load(): pide al servicio a todos los contactos
//this.svc.getAll(): devuelve el observable contact

load(){
  this.svc.getAll()
  .subscribe(list =>{
    //este callback se ejecuta cuando llegan los datos
    //actualiza el array para que la vista se renderice 
this.contacts = list;
  });
}

  // c.id! = confia en mi, este valor no sera null ni underfine
    // este compilador te obliga a manejar el caso de que id no exista
     // activa el modo edicion para ese id

startEdit(c: Contact){
  this.editID = c.id!;
  this.name = c.name;
  this.email = c.email
  this.phone = c.phone || '';
}
//envia cambios al servidor
save(c: Contact){
  //validacion basica (si no esta vacio)
  if(!this.name.trim() || !this.email.trim()) return ;
  //actualiza el objeto contact con los nuevos valores 
  c.name = this.name;
  c.email = this.email
  c.phone = this.phone;
  //svc.update(c)->observable<contact>; al suscribirnos
  this.svc.update(c)
  .subscribe(()=>{
    this.editID = null //salimos del modo edicio
    this.load(); //volvemos a cargar la lista para ver los cambios
  })
}
cancel(){
  this.editID = null;
}
//delete() : elimina contacto

delete(c: Contact){
  if(!confirm(`¿borra a ${c.name}?`)) return;
  this.loading = true;


  this.svc.delete(c.id!)
  .subscribe(()=>{
    this.loading = false; 
    this.load();
  })
}


}


