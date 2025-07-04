import { Component } from '@angular/core';
import { ContactService } from '../../../contacts/service/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//metadata del componente:  
 
               //etiqueta HTML con la que invocamos
  // contact-add.component.ts
@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css'],
   imports: [CommonModule, FormsModule],  
})

export class ContactAddComponent {
  //propiedades de componente - enlazado con [(ngModel)]
  name = '';                  //nombre de nuevo contacto
  email = '';                 //email de nuevo contacto 
  phone = '';                 //telefono de nuevo contacto

  //inyeccion de dependencias
  constructor(
    private svc: ContactService,         //instancia de contact service para llamar a la API o lógica de datos
    private route: Router                //instancia de router para redirigir tras guardar
  ) {}

  //metodo que se ejecuta al enviar el formulario de (ngSubmit)=save()
  save() {
    //validación básica en TS además de la misma en el template
    if (!this.name.trim() || !this.email.trim()) {
      //si el name o email están vacíos o solo espacios
      alert('nombre y email son obligatorios');
      return;
    }

    //llamada al servicio para guardar contacto
    this.svc
      .add({
        name: this.name,
        email: this.email,
        phone: this.phone
      })
      //cuando el observable indica que ha recbido los datos el suscribe ejecutara el redireccionamiento 
      .subscribe(() => {
        this.route.navigate(['/contacts']); // redirige a la lista de contactos
      });
  }
}
