import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { getRegistrosApiServie } from '../../services/getRegistrosApi.service';
import {
  AutomotoresApiResponse,
  AutomotoresInterface,
} from '../../models/automotores.model';
import { TrimPipe } from '../../pipes/trim.pipe';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-automotor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './automotor.component.html',
  styleUrl: './automotor.component.css',
})
export class AutomotorComponent {
  cuit: number = 0;
  Automotores: AutomotoresInterface[] = [];
  estadoCargaEventos: boolean = false;
  sinImpuestos: boolean = false;
  mensajeError: any = null;
  idpatente: any = null;
  IdCont: any = null;
  nro_dni_length: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servTasasMunicipales: getRegistrosApiServie // private actividadesService: ActividadesService, // private fb: FormBuilder, // private router: Router, // private dataRegistroService: DataRegistro, // private actividadesS: ActividadesS, // private servEventos: EventosMunicipalesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.cuit = params['cuit'];
      //localStorage.setItem('cuit', JSON.stringify(this.cuit)); // Guarda cuit en localStorage
    });
    // }

    this.cargarAutomotores(this.cuit);
  }

  linkImpuestos() {
    this.router.navigate(['/impuestos'], {
      queryParams: { cuit: this.cuit },
    });
  }

  contarCaracteresNroDni(nro_dni: number): void {
    const nroDniStr = nro_dni.toString(); // Convierte el número a string
    this.nro_dni_length = nroDniStr.length; // Guarda la cantidad en la propieda
  }

  recargarPagina(): void {
    window.location.reload();
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
          // resto de tu código...
          this.IdCont = automotor.IdCont;
        });
        this.estadoCargaEventos = false;
      },
      (error: HttpErrorResponse) => {
        this.estadoCargaEventos = false;
        this.sinImpuestos = true;
        if (error.status === 0) {
          this.mensajeError =
            'Error: Tiempo de conexión excedido. Asegúrate de que el servidor esté disponible.';
        } else {
          this.mensajeError =
            'No se encontraron patentes asociados al contribuyente...';
        }
        console.error('Error al cargar las patentes:', error);
      }
    );
  }

  // cargarAutomotores(identificador: number): void {
  //   let nro_dni = identificador;
  //   this.contarCaracteresNroDni(nro_dni);

  //   // this.estadoCargaEventos = true;

  //   this.servTasasMunicipales.getTasaAutomotores(nro_dni, 0).subscribe(
  //     (data: AutomotoresApiResponse) => {
  //       // Actualiza aquí al nuevo tipo
  //       this.Automotores = data.automotores; // Ahora TypeScript entiende que 'data' tiene 'automotores'

  //       this.Automotores.forEach((automotor) => {
  //         const idpat = automotor.idpat;
  //         const patente = automotor.patente;
  //         const modeloy2k = automotor.modeloy2k;
  //         const fechaAlta = automotor.FechaAlta;
  //         const marca = automotor.marca.trim(); // para quitar espacios si es necesario
  //         const modeloB = automotor.modelob.trim();
  //         const tipo = automotor.tipo.trim();
  //         const descripcion = automotor.descrip.trim();
  //         const domicilio = automotor.domicilio.trim();
  //         const primerNombre = automotor.NOMRAZ.trim();
  //         const dni = automotor.DNI;
  //         this.IdCont = automotor.IdCont;
  //         // y así con otros campos...

  //         // Puedes guardar estos valores en variables de componente, arrays, o lo que necesitas
  //       });

  //       this.estadoCargaEventos = false;
  //       // console.log(data);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.estadoCargaEventos = false; // Cambia el estado incluso si hay error
  //       this.sinImpuestos = true;
  //       if (error.status === 0) {
  //         this.mensajeError =
  //           'Error: Tiempo de conexión excedido. Asegúrate de que el servidor esté disponible.';
  //       } else {
  //         this.mensajeError =
  //           'No se encontraron patentes asociados al contribuyente...'; // Mensaje genérico
  //       }
  //       console.error('Error al cargar las patentes:', error);
  //     }
  //   );
  // }

  deudaAutomotor(idPat: any, patente: any) {
    let idPatente = idPat;
    let Patente = patente;

    // console.log(idPatente);
    // let idpatente = this.Automotores[0].idpat;
    this.router.navigate(['/deuda-automotor'], {
      queryParams: {
        cuit: this.cuit,
        idPat: idPatente,
        IdCont: this.IdCont,
        patente: Patente,
      },
    });
  }
}
