import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { getRegistrosApiServie } from '../../services/getRegistrosApi.service';
import {
  DeudaAutomotorApiResponse,
  DeudaAutomotorInterface,
} from '../../models/deuda-automotor.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-deuda-automotor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './deuda-automotor.component.html',
  styleUrl: './deuda-automotor.component.css',
})
export class DeudaAutomotorComponent {
  cuit: number = 0;
  estadoCargaEventos: boolean = false;
  sinImpuestos: boolean = false;
  mensajeError: any = null;
  idpatente: any = null;
  idRubro: number = 11112;
  IdCont: number = 0;
  DeudaAutomotor: DeudaAutomotorInterface[] = [];
  Patente: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servTasasMunicipales: getRegistrosApiServie // private actividadesService: ActividadesService, // private fb: FormBuilder, // private router: Router, // private dataRegistroService: DataRegistro, // private actividadesS: ActividadesS, // private servEventos: EventosMunicipalesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.cuit = params['cuit'];
      this.idpatente = params['idPat'];
      this.IdCont = params['IdCont'];
      this.Patente = params['patente'];

      // console.log(this.IdCont);
      //localStorage.setItem('cuit', JSON.stringify(this.cuit)); // Guarda cuit en localStorage
    });
    // }

    this.cargarDeudaAutomotor(this.idpatente, this.idRubro);
  }

  linkAutomotores() {
    this.router.navigate(['/automotores'], {
      queryParams: { cuit: this.cuit },
    });
  }

  recargarPagina(): void {
    window.location.reload();
  }

  linkLiquidacion(valor_deuda: any, tipo_deuda: number) {
    let deuda_valor = valor_deuda;
    let deuda_tipo = tipo_deuda;
    this.router.navigate(['/liquidacion-automotor'], {
      queryParams: {
        cuit: this.cuit,
        IdCont: this.IdCont,
        cod_objeto: this.idpatente,
        importe: deuda_valor,
        tipo_pago: deuda_tipo,
        rubro: this.idRubro,
      },
    });
  }

  cargarDeudaAutomotor(cod_objeto: number, rubro: number): void {
    let Idpatente = cod_objeto;
    let idRubro = rubro;
    this.estadoCargaEventos = true;

    this.servTasasMunicipales.getDeudaAutomotor(Idpatente, idRubro).subscribe(
      (data: DeudaAutomotorApiResponse) => {
        // console.log(data);
        this.DeudaAutomotor = data.patente; // Asigna directamente el array de patentes
        // console.log(this.DeudaAutomotor);
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
