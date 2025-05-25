import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HubPagesComponent } from './pages/hub-pages/hub-pages.component';
import { AutomotorComponent } from './pages/automotor/automotor.component';
import { InmueblesComponent } from './pages/inmuebles/inmuebles.component';
import { ListaImpuestosComponent } from './pages/lista-impuestos/lista-impuestos.component';
import { DeudaAutomotorComponent } from './pages/deuda-automotor/deuda-automotor.component';
import { LiquidacionAutomotorComponent } from './pages/liquidacion-automotor/liquidacion-automotor.component';
import { DeudaInmuebleComponent } from './pages/deuda-inmueble/deuda-inmueble.component';
import { LiquidacionInmuebleComponent } from './pages/liquidacion-inmueble/liquidacion-inmueble.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  // { path: '', component: HubPagesComponent },
  {
    path: '',
    component: HubPagesComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'impuestos', component: ListaImpuestosComponent },
      { path: 'automotores', component: AutomotorComponent },
      { path: 'inmuebles', component: InmueblesComponent },
      { path: 'deuda-automotor', component: DeudaAutomotorComponent },
      { path: 'deuda-inmobiliario', component: DeudaInmuebleComponent },
      {
        path: 'liquidacion-automotor',
        component: LiquidacionAutomotorComponent,
      },
      {
        path: 'liquidacion-inmobiliario',
        component: LiquidacionInmuebleComponent,
      },
      // {
      //   path: 'deuda-automotor/:idPat/:cuit',
      //   component: DeudaAutomotorComponent,
      // },
      // { path: 'eventos/asignarA/:id', component: AsignarActividadesComponent },
      // { path: 'eventos/actividades/:idEvento/:idRubro', component: ActividadesComponent },
      // { path: 'eventos/actividades-asignadas/:idEvento', component: ActividadesAsignadasComponent },
    ],
  },
];
