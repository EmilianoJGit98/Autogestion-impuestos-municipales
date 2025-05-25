import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { getRegistrosApiServie } from '../../services/getRegistrosApi.service';
import {
  AutomotoresApiResponse,
  AutomotoresInterface,
} from '../../models/automotores.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista-impuestos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './lista-impuestos.component.html',
  styleUrl: './lista-impuestos.component.css',
})
export class ListaImpuestosComponent {
  cuit: number = 0;
  nro_dni_length: number = 0;
  Automotores: AutomotoresInterface[] = [];
  estadoCargaEventos: boolean = false;
  sinImpuestos: boolean = false;
  mensajeError: any = null;
  NombreCompleto: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servTasasMunicipales: getRegistrosApiServie
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.cuit = params['cuit'];
    });

    this.cargarAutomotores(this.cuit);
  }

  linkAutomotores() {
    this.router.navigate(['/automotores'], {
      queryParams: { cuit: this.cuit },
    });
  }

  linkInmuebles() {
    this.router.navigate(['/inmuebles'], {
      queryParams: { cuit: this.cuit },
    });
  }

  contarCaracteresNroDni(nro_dni: number): void {
    const nroDniStr = nro_dni.toString(); // Convierte el número a string
    this.nro_dni_length = nroDniStr.length; // Guarda la cantidad en la propieda
  }

  linkImpuestos() {
    this.router.navigate(['']);
  }

  cargarAutomotores(identificador: number): void {
    let nro_dni = identificador;
    this.contarCaracteresNroDni(nro_dni);

    // Validar cantidad de caracteres
    const cantidadCaracteres = this.nro_dni_length; // ya lo contamos antes

    // Determinar parámetros según tamaño
    const param1 = cantidadCaracteres > 8 ? 0 : nro_dni;
    const param2 = cantidadCaracteres > 8 ? nro_dni : 0;

    // Llamada a servicio con condición
    this.servTasasMunicipales.getTasaAutomotores(param1, param2).subscribe(
      (data: AutomotoresApiResponse) => {
        this.Automotores = data.automotores;
        this.Automotores.forEach((automotor) => {
          this.NombreCompleto = automotor.NOMRAZ;
        });
        this.estadoCargaEventos = false;
      },
      (error: HttpErrorResponse) => {
        this.sinImpuestos = true;
        this.estadoCargaEventos = false;
        if (error.status === 0) {
          this.mensajeError =
            'Error: Tiempo de conexión excedido. Asegúrate de que el servidor esté disponible.';
        } else {
          this.mensajeError =
            'El DNI o CUIL ingresados no existen, intente nuevamente con otro...';
        }
        console.error('Error al cargar contribuyente:', error);
      }
    );
  }
}
