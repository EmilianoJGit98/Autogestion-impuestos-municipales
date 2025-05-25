import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ActividadAsignadaInterface } from '../models/actividad-asignada.model';
import { SubRubroInterface } from '../models/subrurbros.model';
import { RubroInterface } from '../models/rubros.model';
import {
  AutomotoresApiResponse,
  AutomotoresInterface,
} from '../models/automotores.model';
import { InmobiliariasApiResponse } from '../models/inmobiliarias.model';
import { DeudaAutomotorApiResponse } from '../models/deuda-automotor.model';

@Injectable({
  providedIn: 'root',
})
export class getRegistrosApiServie {
  private apiUrl = `${environment.base_url}`;
  // private apiUrl = 'http://192.168.0.248:8000/api/eventos';
  // private apiUrl = 'http://192.168.0.77:8000/api/eventos';
  // private apiUrl = 'http://192.168.200.113:8002/api/eventos';

  // idRubro: number = 0;
  nro_dni: number = 0;
  nro_cuit: number = 0;
  // idEvento: number = 0;

  constructor(private http: HttpClient) {}

  getTasaAutomotores(
    nro_dni: number,
    nro_cuit: number
  ): Observable<AutomotoresApiResponse> {
    // Crea el cuerpo de la solicitud utilizando URLSearchParams
    const body = new URLSearchParams();
    body.set('nro_dni', nro_dni.toString()); // Convertir a string
    body.set('nro_cuit', nro_cuit.toString()); // Convertir a string

    // Configura los headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    });

    return this.http.post<AutomotoresApiResponse>(
      `${this.apiUrl}/api/autogestion/listar_automotores/`,
      body.toString(), // Enviar el cuerpo como una cadena
      { headers }
    );
  }

  getTasaInmobiliarias(
    nro_dni: number,
    nro_cuit: number
  ): Observable<InmobiliariasApiResponse> {
    // Crea el cuerpo de la solicitud utilizando URLSearchParams
    const body = new URLSearchParams();
    body.set('nro_dni', nro_dni.toString()); // Convertir a string
    body.set('nro_cuit', nro_cuit.toString()); // Convertir a string

    // Configura los headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    });

    return this.http.post<InmobiliariasApiResponse>(
      `${this.apiUrl}/api/autogestion/listar_partidas/`,
      body.toString(), // Enviar el cuerpo como una cadena
      { headers }
    );
  }

  getDeudaAutomotor(
    idPat: number,
    idRubro: number
  ): Observable<DeudaAutomotorApiResponse> {
    const params = new HttpParams()
      .set('cod_objeto', idPat.toString()) // Convertir a string
      .set('rubro', idRubro.toString()); // Convertir a string

    // Configura los headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    });

    return this.http.post<DeudaAutomotorApiResponse>(
      `${this.apiUrl}/api/autogestion/mostrar_deudas/`,
      {}, // Solo enviamos un cuerpo vacío
      { headers, params } // Pasar los parámetros de consulta en la solicitud
    );
  }

  generarLiquidacionObjeto(
    cod_objeto: number,
    id_contribuyente: number,
    rubro: number,
    tipo_pago: number,
    importe: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('cod_objeto', cod_objeto.toString())
      .set('id_contribuyente', id_contribuyente.toString())
      .set('rubro', rubro.toString())
      .set('tipo_pago', tipo_pago.toString())
      .set('importe', importe.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    });

    // Envías los datos como parámetros de consulta y cuerpo vacío
    return this.http.post<any>(
      `${this.apiUrl}/api/autogestion/generar_recibo_deuda/`,
      '', // cuerpo vacío
      { headers, params }
    );
  }
  // }

  // getTasaAutomotores(
  //   nro_dni: number,
  //   nro_cuit: number
  // ): Observable<AutomotoresInterface[]> {
  //   const body = { nro_dni, nro_cuit }; // Crea el cuerpo de la solicitud
  //   const headers = { 'Content-Type': 'x-www-form-urlencoded' }; // Por ejemplo
  //   return this.http.post<AutomotoresInterface[]>(
  //     this.apiUrl + '/api/autogestion/listar_automotores/',
  //     body,
  //     { headers }
  //   );
  // }

  // getTasaAutomotores(
  //   identificador: number
  // ): Observable<AutomotoresInterface[]> {
  //   this.identificador = identificador;
  //   return this.http.get<AutomotoresInterface[]>(
  //     this.apiUrl + '/api/autogestion/listar_automotores/' + this.identificador
  //   );
  // }

  // getEventos(estado: number): Observable<EventoInterface[]> {
  //   this.activo = estado;
  //   return this.http.get<EventoInterface[]>(
  //     this.apiUrl + '?activo=' + this.activo
  //   );
  // }

  // getRubros(): Observable<RubroInterface[]> {
  //   return this.http.get<RubroInterface[]>(this.apiUrl + '/rubros');
  // }

  // getSubRubros(idRubro: number): Observable<SubRubroInterface[]> {
  //   this.idRubro = idRubro;
  //   return this.http
  //     .get<SubRubroInterface[]>(`${this.apiUrl}/subrubros/${this.idRubro}`)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         if (error.status === 404) {
  //           // Maneja el error 404 aquí
  //           return of([]); // Devuelve un array vacío en caso de no encontrar subrubros
  //         } else {
  //           // Si es un error diferente, puedes lanzarlo nuevamente
  //           return throwError(error); // O manejarlo de otra forma
  //         }
  //       })
  //     );
  // }

  // getActividadesAsignadas(
  //   idEvento: number
  // ): Observable<ActividadAsignadaInterface[]> {
  //   this.idEvento = idEvento;
  //   return this.http
  //     .get<ActividadAsignadaInterface[]>(
  //       `${this.apiUrl}/actividades/${this.idEvento}`
  //     )
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         if (error.status === 404) {
  //           // Maneja el error 404 aquí
  //           return of([]); // Devuelve un array vacío en caso de no encontrar subrubros
  //         } else {
  //           // Si es un error diferente, puedes lanzarlo nuevamente
  //           return throwError(error); // O manejarlo de otra forma
  //         }
  //       })
  //     );
  // }
}
