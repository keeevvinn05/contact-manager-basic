import { Routes } from '@angular/router';
import { ContactListComponent } from './contact/components/contact-list/contact-list.component';
import { ContactAddComponent } from './contact/components/contact-add/contact-add.component';


// Definición de las rutas de la aplicación
export const routes: Routes = [
  {
    path: '', // Ruta raíz 
    redirectTo: 'contacts', // Redirige automáticamente a /contacts
    pathMatch: 'full' // Coincide solo si la URL es exactamente ''
  },
  {
    path: 'contacts', // Ruta /contacts
    component: ContactListComponent // Muestra la lista de contactos
  },
  {
    path: 'contact/add', // Ruta /contact/add
    component: ContactAddComponent // Muestra el formulario para crear un nuevo contacto
  },
  {
    path: '**', // Ruta comodín (cuando no se encuentra ninguna ruta válida)
    redirectTo: 'contacts' // Redirige a /contacts como página por defecto
  }
];
