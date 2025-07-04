import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz que define la estructura de un contacto
export interface Contact {
  id?: number;          // ID opcional del contacto
  name: string;         // Nombre del contacto
  email: string;        // Correo del contacto
  phone?: string;       // Teléfono opcional
}

// Decorador que marca este servicio como inyectable a nivel global
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api = 'http://localhost:3001/contacts'; // URL base de la API

  constructor(private http: HttpClient) {} // Inyectamos el servicio HttpClient

  // Obtener todos los contactos
  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.api); // GET http://localhost:3001/contacts
  }

  // Añadir un nuevo contacto
  add(c: Contact): Observable<Contact> {
    // POST http://localhost:3001/contacts con el cuerpo c
    return this.http.post<Contact>(this.api, c);
  }

  // Actualizar un contacto existente
  update(c: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.api}/${c.id}`, c); // PUT http://localhost:3001/contacts/:id
  }

  // Eliminar un contacto por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`); // DELETE http://localhost:3001/contacts/:id
  }
}
