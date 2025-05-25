import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode',
  template: `<svg #barcode></svg>`,
})
export class BarcodeComponent implements AfterViewInit, OnChanges {
  @ViewChild('barcode', { static: false })
  barcodeRef!: ElementRef<SVGSVGElement>;

  @Input() value!: string;
  @Input() type: string = 'CODE128';

  ngOnChanges() {
    this.generateBarcode();
  }

  ngAfterViewInit(): void {
    this.generateBarcode();
  }

  private generateBarcode() {
    if (!this.barcodeRef || !this.value || this.value.trim() === '') {
      console.warn('Valor de código de barras vacío o inválido');
      return;
    }

    // Validar que el valor sea válido para CODE128
    const isValid = this.validateBarcodeValue(this.value);
    if (!isValid) {
      console.error(`"${this.value}" no es un valor válido para ${this.type}`);
      return;
    }

    JsBarcode(this.barcodeRef.nativeElement, this.value, {
      format: this.type,
      lineColor: '#000',
      width: 1.8,
      height: 70,
      displayValue: true,
    });
  }

  private validateBarcodeValue(val: string): boolean {
    // Puedes personalizar la validación según el formato
    // Por ejemplo, sólo aceptar alfanuméricos y algunos símbolos
    return /^[a-zA-Z0-9.\-_/$+%*]+$/.test(val);
  }
}
