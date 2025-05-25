export interface AutomotoresInterface {
  idpat: number;
  patente: string;
  patreg: string | null;
  modeloy2k: string;
  FechaAlta: Date;
  FechaBaja: Date | null;
  NroExpte: string | null;
  altaprovi: boolean;
  desucerp: boolean;
  marca: string;
  modelob: string;
  tipo: string;
  descrip: string;
  detalle: string;
  cuim: string;
  f_vig_desde: Date;
  NOMRAZ: string;
  DNI: number;
  Barrio: string;
  Calle: string | null;
  altura: number;
  mz: string;
  sector: string;
  parcela: string;
  torre: string;
  piso: string;
  dpto: string;
  casa: string;
  domicilio: string;
  Res5746: string | null;
  Porcentaje: number;
  EnMasiva: boolean;
  IDBloqueo: number | null;
  IdCont: number;
  Descripcion: string;
  BajaProvisoria: boolean;
}

export interface AutomotoresApiResponse {
  automotores: AutomotoresInterface[]; // Cambia el nombre si es necesario
}
