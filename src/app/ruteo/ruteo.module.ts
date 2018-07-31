import { CanActivate } from '@angular/router/public_api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {PrincipalComponent} from '../componentes/principal/principal.component';
import {RegistroComponent} from '../componentes/registro/registro.component';
import {HorariosComponent} from '../componentes/horarios/horarios.component';
import {ErrorComponent} from '../componentes/error/error.component';
import {LoginComponent} from '../componentes/login/login.component';
import {AbmRemiserosComponent} from '../componentes/abm-remiseros/abm-remiseros.component';
import {AbmVehiculosComponent} from '../componentes/abm-vehiculos/abm-vehiculos.component';
import {ListaViajesComponent} from '../componentes/lista-viajes/lista-viajes.component';
import {GestorViajesComponent} from '../componentes/gestor-viajes/gestor-viajes.component';
import {ViajeComponent} from '../componentes/viaje/viaje.component';
import {EncuestaComponent} from '../componentes/encuesta/encuesta.component';
import {GraficosComponent} from '../componentes/graficos/graficos.component';
import {InformesComponent} from '../componentes/informes/informes.component';

import {VerificarService} from '../servicios/verificar.service';

const MiRuteo = [
{path: '' , component: LoginComponent},
// {path: 'Login' , component: LoginComponent},
// {path: 'Principal' , component: PrincipalComponent,canActivate: [VerificarService],},
// {path: 'Remiseros' , component: AbmRemiserosComponent,canActivate: [VerificarService],},
// {path: 'Vehiculos' , component: AbmVehiculosComponent,canActivate: [VerificarService],},
// {path: 'Viaje' , component: ViajeComponent,canActivate: [VerificarService],},
// {path: 'Registro' , component: RegistroComponent},
{path: 'Login' , component: LoginComponent},
{path: 'Principal' , component: PrincipalComponent,canActivate: [VerificarService],},
{path: 'Remiseros' , component: AbmRemiserosComponent,canActivate: [VerificarService],},
{path: 'Vehiculos' , component: AbmVehiculosComponent,canActivate: [VerificarService],},
{path: 'Horario' , component: HorariosComponent,canActivate: [VerificarService],},
{path: 'Viaje' , component: ViajeComponent,canActivate: [VerificarService],},
{path: 'listaViajes' , component: ListaViajesComponent,canActivate: [VerificarService],},
{path: 'gestorViajes' , component: GestorViajesComponent,canActivate: [VerificarService],},
{path: 'Encuesta' , component: EncuestaComponent,canActivate: [VerificarService],},
{path: 'Graficos', component: GraficosComponent,canActivate: [VerificarService],},
{path: 'Informes', component: InformesComponent,canActivate: [VerificarService],},
{path: 'Registro' , component: RegistroComponent},
{path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}]


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteoModule { }
