import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  private firestore = inject(Firestore);

  obtenerMensajes(): Observable<any[]> {

    const mensajesRef = collection(
      this.firestore,
      'foro'
    );

    const consulta = query(
      mensajesRef,
      orderBy('fecha', 'desc')
    );

    return collectionData(
      consulta,
      {
        idField: 'idDoc'
      }
    ) as Observable<any[]>;

  }

  async agregarMensaje(
    mensaje: any
  ): Promise<void> {

    const mensajesRef = collection(
      this.firestore,
      'foro'
    );

    await addDoc(
      mensajesRef,
      mensaje
    );

  }

}