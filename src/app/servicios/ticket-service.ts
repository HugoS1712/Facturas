import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  orderBy,
  doc,
  updateDoc,
  getDoc
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private firestore = inject(Firestore);

  getTickets(): Observable<any[]> {

    const ticketsRef = collection(
      this.firestore,
      'ticketsv2'
    );

    const consulta = query(
      ticketsRef,
      orderBy(
        'fechaCreacion',
        'desc'
      )
    );

    return collectionData(
      consulta,
      {
        idField: 'idDoc'
      }
    ) as Observable<any[]>;

  }

  async agregarTicket(
    ticket: any
  ): Promise<void> {

    const ticketsRef = collection(
      this.firestore,
      'ticketsv2'
    );

    await addDoc(
      ticketsRef,
      ticket
    );

  }

  async actualizarTicket(
    idDoc: string,
    datos: any
  ): Promise<void> {

    const ticketRef = doc(
      this.firestore,
      'ticketsv2',
      idDoc
    );

    await updateDoc(
      ticketRef,
      datos
    );

  }

  async getTicket(
    idDoc: string
  ): Promise<any> {

    const ticketRef = doc(
      this.firestore,
      'ticketsv2',
      idDoc
    );

    const snapshot =
      await getDoc(
        ticketRef
      );

    if (snapshot.exists()) {

      return {
        idDoc: snapshot.id,
        ...snapshot.data()
      };

    }

    return null;

  }

}