export interface InmobiliariasInterface {
  nomenclatura: string;
  partida: number;
  tipoParcela: number;
  tipoParcelaDesc: string;
  unidMedidaSup: string;
  superifice: number;
  domIdBarrio: number;
  domBario: string;
  domIdCalle: number;
  domCalle: string;
  domAltura: string;
  domPiso: string;
  domDepto: string;
  domSector: string;
  domTorre: string;
  domManzana: string;
  domCasa: string;
  domParcela: string;
  titularResponsable: string;
  tipoDoc: number;
  tipoDocDesc: string;
  cod_prov: number;
  nro_doc: number;
  Titular: string;
  cuim: string;
  resPago: string | null;
  tributoAnio: number;
  cuotaTasa: number;
  anualInmo: number;
  valuacion: number;
  fechaAlta: string;
  bloqueda: string;
  IdCont: number;
  Tasa: boolean;
  Inmo: boolean;
  Descripcion: string;
}

export interface InmobiliariasApiResponse {
  partidas: InmobiliariasInterface[]; // Cambia el nombre si es necesario
}
