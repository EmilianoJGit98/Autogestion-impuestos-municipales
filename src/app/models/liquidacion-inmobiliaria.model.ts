export interface Cabecera {
  idregistro: number;
  cuim: string;
  partida: string;
  nro_doc: string;
  nomraz: string;
  nomenclatura: string;
  superficie: number;
  barrio: string;
  calle: string;
  altura: number;
  manzana: number;
  sector: number;
  parcela: number;
  torre: number;
  piso: number;
  depto: number;
  casa: number;
  marca: string | null;
  modelo: string | null;
  tipo: string | null;
  codbarf: string;
  codigoobjeto: string;
  idrubro: number;
  SubRubro: number;
  monto1v: number;
  primerv: string; // Fecha en formato ISO
}

export interface Detalle {
  idLiquidacion: number;
  periodo_cuota: string;
  recibo: number;
  puntov: number;
  importe_total: number;
  Descuento: string | null;
}

export interface Datos {
  cabecera: Cabecera;
  detalle: Detalle[];
}
