import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim',
  standalone: true,
})
export class TrimPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.trim() : value; // Verifica si el valor no es nulo o indefinido
  }
}
