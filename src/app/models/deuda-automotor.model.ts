export interface DeudaAutomotorInterface {
  success: boolean;
  solodeuda: number;
  totalcondesc: number;
}

export interface DeudaAutomotorApiResponse {
  patente: DeudaAutomotorInterface[]; // Suponiendo que esta es la estructura
}
