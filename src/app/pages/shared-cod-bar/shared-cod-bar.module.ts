import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BarcodeComponent } from './barcode.component';
import { BarcodeComponent } from '../cod-barras/cod-barras.component';

@NgModule({
  declarations: [BarcodeComponent],
  exports: [BarcodeComponent], // Esto permite usarlo en otros módulos
  imports: [CommonModule],
})
export class SharedCodBarModule {}
