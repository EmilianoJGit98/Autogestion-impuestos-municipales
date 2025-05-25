import { FormsModule } from '@angular/forms';
import { Component, Pipe, PipeTransform } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  InmobiliariasApiResponse,
  InmobiliariasInterface,
} from '../../models/inmobiliarias.model';
import { getRegistrosApiServie } from '../../services/getRegistrosApi.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { TrimPipe } from '../../pipes/trim.pipe';

@Pipe({
  name: 'trim',
  standalone: true,
})
export class TrimPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.trim() : value; // Verifica si el valor no es nulo o indefinido
  }
}

@Component({
  selector: 'app-inmuebles',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './inmuebles.component.html',
  styleUrl: './inmuebles.component.css',
})
export class InmueblesComponent {
  cuit: number = 0;
  Inmuebles: InmobiliariasInterface[] = [];
  estadoCargaEventos: boolean = false;
  sinImpuestos: boolean = false;
  mensajeError: any = null;
  IdCont: any = null;
  rubro: number = 11205;
  partida: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servTasasMunicipales: getRegistrosApiServie // private actividadesService: ActividadesService, // private fb: FormBuilder, // private router: Router, // private dataRegistroService: DataRegistro, // private actividadesS: ActividadesS, // private servEventos: EventosMunicipalesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.cuit = params['cuit'];
      // console.log('CUIT recibido inmuebles:', this.cuit);
    });

    this.cargarInmuebles(this.cuit);
  }

  linkImpuestos() {
    this.router.navigate(['/impuestos'], {
      queryParams: { cuit: this.cuit },
    });
  }

  recargarPagina(): void {
    window.location.reload();
  }

  cargarInmuebles(identificador: number): void {
    let nro_dni = identificador;
    this.estadoCargaEventos = true;

    this.servTasasMunicipales.getTasaInmobiliarias(nro_dni, 0).subscribe(
      (data: InmobiliariasApiResponse) => {
        // Actualiza aquí al nuevo tipo
        this.Inmuebles = data.partidas; // Ahora TypeScript entiende que 'data' tiene 'automotores'
        this.estadoCargaEventos = false;

        this.Inmuebles.forEach((partida) => {
          this.IdCont = partida.IdCont;
          this.partida = partida.partida;
          // y así con otros campos...

          // Puedes guardar estos valores en variables de componente, arrays, o lo que necesitas
        });

        // console.log(this.Inmuebles);
      },
      (error: HttpErrorResponse) => {
        this.sinImpuestos = true;
        // console.error('Error al cargar las patentes:', error);
        this.estadoCargaEventos = false; // Cambia el estado incluso si hay error
        if (error.error && error.error.detail) {
          this.mensajeError = error.error.detail; // Captura el mensaje de detalle
        } else {
          this.mensajeError =
            'No se encontraron partidas asociados al contribuyente..'; // Mensaje genérico
        }
      }
    );
  }

  deudaInmueble(partida: number) {
    let idPartida = partida;

    // console.log(idPatente);
    // let idpatente = this.Automotores[0].idpat;
    this.router.navigate(['/deuda-inmobiliario'], {
      queryParams: {
        cuit: this.cuit,
        partida: this.partida,
        IdCont: this.IdCont,
      },
    });
  }
}
