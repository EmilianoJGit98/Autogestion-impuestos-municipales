import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'; // Asegúrate de importar MatTableDataSource
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  estadoCargaEventos: boolean = false;
  inputCuit: FormGroup;
  cuitValue: string | null = null;

  constructor(private router: Router, private fb: FormBuilder) {
    this.inputCuit = this.fb.group({
      cuit: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/),
        ],
      ],
    });
  }

  // this.inputCuit = this.fb.group({})

  BuscarContribuyente() {
    if (this.inputCuit.valid) {
      this.cuitValue = this.inputCuit.get('cuit')?.value;

      this.estadoCargaEventos = true;

      setTimeout(() => {
        this.estadoCargaEventos = false;
        // this.router.navigateByUrl('impuestos');

        this.router.navigate(['/impuestos'], {
          queryParams: { cuit: this.cuitValue },
        });
      }, 2000); // 5000 milisegundos = 5 segundos
    }
    // console.log(this.inputCuit);
  }
}
