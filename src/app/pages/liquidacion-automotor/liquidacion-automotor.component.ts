import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getRegistrosApiServie } from '../../services/getRegistrosApi.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SharedCodBarModule } from '../shared-cod-bar/shared-cod-bar.module';

@Component({
  selector: 'app-liquidacion-automotor',
  standalone: true,
  imports: [CommonModule, SharedCodBarModule],
  templateUrl: './liquidacion-automotor.component.html',
  styleUrl: './liquidacion-automotor.component.css',
})
export class LiquidacionAutomotorComponent {
  @ViewChild('contentToPrint', { static: false }) contentToPrint!: ElementRef;
  cuit: number = 0;
  cod_objeto: number = 0;
  IdCont: number = 0;
  importe: number = 0;
  tipo_pago: number = 0;
  rubro: number = 11112;
  estadoCargaEventos: boolean = false;

  respuestaCabecera: any = null;
  respuestaDetalle: any[] = [];

  mensajeError: any = null;
  codigoBarra: string = '';
  respuestaLiquidacion: any = null;
  // tipo pago
  // 1 deuda
  // 2 total + deuda

  //importe
  //debe ser el importe del tipo de pago seleccionado

  //rubro
  //11112 automotor
  //11205 inmueble

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private servTasasMunicipales: getRegistrosApiServie // private actividadesService: ActividadesService, // private fb: FormBuilder, // private router: Router, // private dataRegistroService: DataRegistro, // private actividadesS: ActividadesS, // private servEventos: EventosMunicipalesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.cuit = params['cuit'];
      this.cod_objeto = params['cod_objeto'];
      this.IdCont = params['IdCont'];
      this.importe = params['importe'];
      this.tipo_pago = params['tipo_pago'];
      this.importe = params['importe'];

      //localStorage.setItem('cuit', JSON.stringify(this.cuit)); // Guarda cuit en localStorage
      this.cargarDatosLiquidacion(
        this.cod_objeto,
        this.IdCont,
        this.rubro,
        this.tipo_pago,
        this.importe
      );
    });
    // }

    //this.cargarDeudaAutomotor(this.IdPartida, this.idRubro);
  }

  cargarDatosLiquidacion(
    cod_objeto: number,
    id_contribuyente: number,
    rubro: number,
    tipo_pago: number,
    importe: number
  ): void {
    //this.estadoCargaEventos = true;
    let objeto = cod_objeto;
    let contribuyente = id_contribuyente;
    let IDrubro = rubro;
    let pago_tipo = tipo_pago;
    let importe_deuda = importe;

    this.servTasasMunicipales
      .generarLiquidacionObjeto(
        objeto,
        contribuyente,
        IDrubro,
        pago_tipo,
        importe_deuda
      )
      .subscribe(
        (data: any) => {
          // console.log('Respuesta:', data);
          //this.estadoCargaEventos = false;
          this.respuestaLiquidacion = data;
          this.respuestaCabecera = data.cabecera;
          this.respuestaDetalle = data.detalle || [];

          if (
            this.respuestaLiquidacion.detalle &&
            Array.isArray(this.respuestaLiquidacion.detalle)
          ) {
            this.respuestaLiquidacion.detalle.forEach((detalle: any) => {
              // Variables para cada detalle
              const idLiquidacion = detalle.idLiquidacion;
              const periodoCuota = detalle.periodo_cuota;
              const recibo = detalle.recibo;
              const puntoV = detalle.puntov;
              const importeTotal = detalle.importe_total;
              const descuento = detalle.Descuento;

              // Aquí puedes usar o guardar estas variables según necesites
            });
          }

          if (Array.isArray(data.cabecera) && data.cabecera.length > 0) {
            this.respuestaCabecera = data.cabecera[0];
            this.codigoBarra = this.respuestaCabecera.codbarf.trim();
            // console.log(this.codigoBarra);
          } else if (data.cabecera) {
            this.codigoBarra = data.cabecera.codbarf.trim();
            // console.log(this.codigoBarra);
          }
        },
        (error: HttpErrorResponse) => {
          //this.estadoCargaEventos = false;
          this.mensajeError = 'Error al procesar la solicitud.';
          console.error('Error en la solicitud:', error);
        }
      );
  }

  deudaAutomotor() {
    // let idpatente = this.Automotores[0].idpat;
    this.router.navigate(['/deuda-automotor'], {
      queryParams: {
        cuit: this.cuit,
        idPat: this.cod_objeto,
        IdCont: this.IdCont,
      },
    });
  }

  imprimir() {
    this.estadoCargaEventos = true;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Impresión</title>
             <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'>
    <link href='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/dist/sweetalert2.min.css' rel='stylesheet'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css' integrity='sha512-nMNlpuaDPrqlEls3IX/Q56H36qvBASwb3ipuo3MxeWbsQB1881ox0cRv7UPTgBlriqoynt35KjEwgGUeUXIPnw==' crossorigin='anonymous' referrerpolicy='no-referrer' />
    <link rel='preconnect' href='https://fonts.googleapis.com'>
    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
    <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap' rel='stylesheet'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/wesome/6.4.0/css/all.min.css' integrity='sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==' crossorigin='anonymous' referrerpolicy='no-referrer' />
            <style>
             @import "~bootstrap-icons/font/bootstrap-icons.css";
              body { font-family: Arial, sans-serif; }
            </style>
          </head>
          <body>
            ${this.contentToPrint.nativeElement.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();

      setTimeout(() => {
        // Ocultar pantalla de carga
        this.estadoCargaEventos = false;
        this.router.navigate(['']);
      }, 10000);
    }
  }
}
