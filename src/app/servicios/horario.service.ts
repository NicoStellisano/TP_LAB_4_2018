import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Remisero } from '../clases/remisero';
import { Vehiculo } from '../clases/vehiculo';
import { Horario } from '../clases/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(public miHttp: HttpService) { }

  guardarHorario(horario: Horario)
  {
    let result: Promise<number> = this.miHttp.entregarHorario(horario,'guardarHorario')
      .then(datos => {
        return datos;
      })
      .catch(error => {
        console.log(error);
        return 0;
      });
    return result;
  }

  BuscarRemisero(legajo:string): Promise<any>
  {
    let promesa: Promise<any> = new Promise((resolve, reject) => {
      this.miHttp.buscarRemisero("BuscarRemisero",legajo)
        .then(datos => {
          if (datos.length > 0) {
            let miArray: Array<Remisero> = new Array<Remisero>();
            let vehiculo: Vehiculo;
            let remisero: Remisero;
            if(datos[0].id != null)
            {
              vehiculo = new Vehiculo(datos[0].id,datos[0].marca,datos[0].modelo,datos[0].patente,datos[0].fotoVehiculo,datos[0].estadoVehiculo,1);
            }
            else
            {
              vehiculo = new Vehiculo(null,null,null,null,null,null,null);
            }
            miArray.push(new Remisero(datos[0].legajo, datos[0].usuario, datos[0].nombre,datos[0].contrasenia,datos[0].tipo,datos[0].foto,datos[0].fechaDeNacimiento,datos[0].estado,datos[0].sexo,vehiculo));                        
            resolve(miArray);
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
  BuscarHorario(legajo:string): Promise<any>
  {
    let promesa: Promise<any> = new Promise((resolve, reject) => {
      this.miHttp.buscarHorario("BuscarHorario",legajo)
        .then(datos => {
          if (datos.length > 0) {
            let miArray: Array<Horario> = new Array<Horario>();
            let vehiculo: Vehiculo;
            let remisero: Remisero;
            miArray.push(new Horario(datos[0].id, datos[0].idremisero, datos[0].idvehiculo, datos[0].horaDesde,datos[0].horaHasta,datos[0].estado));                        
            resolve(miArray);
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
  BuscarHorarioViaje(horario:string): Promise<any>
  { 
    let promesa: Promise<any> = new Promise((resolve, reject) => {
      this.miHttp.buscarHorarioViaje("BuscarHorarioViaje",horario)
        .then(datos => {
          if (datos.length > 0) {
            let resultado: any = {};
            let miArray: Array<Horario> = new Array<Horario>();
            let fotos: Array<string> = [];
            for(let i = 0;i < datos.length;i++)
            {
              miArray.push(new Horario(datos[i].id, datos[i].idremisero, datos[i].idvehiculo, datos[i].horaDesde,datos[i].horaHasta,datos[i].estado));
              fotos.push(datos[i].foto);
            }
            resultado.array = miArray;
            resultado.fotos = fotos;      
            resolve(resultado);
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
  VerificarHorario(legajo,desde,hasta): Promise<any>
  {
    let promesa: Promise<any> = new Promise((resolve, reject) => {
      this.miHttp.VerificarHorario("VerificarHorario",legajo,desde,hasta)
        .then(datos => {
          if (datos.length > 0) {
            resolve(datos[0].cant);  
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
}
