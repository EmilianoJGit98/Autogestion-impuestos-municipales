import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DeudaAutomotorInterface,
  DeudaAutomotorApiResponse,
} from '../../models/deuda-automotor.model';
import { getRegistrosApiServie } from '../../services/getRegistrosApi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deuda-inmueble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deuda-inmueble.component.html',
  styleUrl: './deuda-inmueble.component.css',
})
export class DeudaInmuebleComponent {
  cuit: number = 0;
  estadoCargaEventos: boolean = false;
  sinImpuestos: boolean = false;
  mensajeError: any = null;
  IdPartida: any = null;
  idRubro: number = 11205;
  IdCont: number = 0;
  DeudaInmobiliario: DeudaAutomotorInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servTasasMunicipales: getRegistrosApiServie // private actividadesService: ActividadesService, // private fb: FormBuilder, // private router: Router, // private dataRegistroService: DataRegistro, // private actividadesS: ActividadesS, // private servEventos: EventosMunicipalesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.cuit = params['cuit'];
      this.IdPartida = params['partida'];
      this.IdCont = params['IdCont'];

      // console.log(this.IdPartida);
      //localStorage.setItem('cuit', JSON.stringify(this.cuit)); // Guarda cuit en localStorage
    });
    // }

    this.cargarDeudaAutomotor(this.IdPartida, this.idRubro);
  }

  recargarPagina(): void {
    window.location.reload();
  }

  linkInmobiliarios() {
    this.router.navigate(['/inmuebles'], {
      queryParams: { cuit: this.cuit },
    });
  }

  linkLiquidacion(valor_deuda: any, tipo_deuda: number) {
    let deuda_valor = valor_deuda;
    let deuda_tipo = tipo_deuda;
    this.router.navigate(['/liquidacion-inmobiliario'], {
      queryParams: {
        cuit: this.cuit,
        IdCont: this.IdCont,
        cod_objeto: this.IdPartida,
        importe: deuda_valor,
        tipo_pago: deuda_tipo,
        rubro: this.idRubro,
      },
    });
  }

  cargarDeudaAutomotor(cod_objeto: number, rubro: number): void {
    let IdPartida = cod_objeto;
    let idRubro = rubro;
    this.estadoCargaEventos = true;
    this.servTasasMunicipales.getDeudaAutomotor(IdPartida, idRubro).subscribe(
      (data: DeudaAutomotorApiResponse) => {
        // console.log(data);
        this.DeudaInmobiliario = data.patente; // Asigna directamente el array de patentes
        // console.log(data);
        this.estadoCargaEventos = false;
      },
      (error: HttpErrorResponse) => {
        this.estadoCargaEventos = false; // Cambia el estado incluso si hay error
        this.sinImpuestos = true;
        if (error.status === 0) {
          this.mensajeError =
            'Error: Tiempo de conexión excedido. Asegúrate de que el servidor esté disponible.';
        } else {
          this.mensajeError =
            'No se encontraron patentes asociados al contribuyente...'; // Mensaje genérico
        }
        console.error('Error al cargar las patentes:', error);
      }
    );
  }
}
