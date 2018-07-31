import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Vehiculo } from '../clases/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  constructor(public miHttp: HttpService) { }
  public listarVehiculosPromesa(): Promise<Array<Vehiculo>> {
    let promesa: Promise<Array<Vehiculo>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesas('vehiculo')
        .then(datos => {
          console.log(datos);
          let miArray: Array<Vehiculo> = new Array<Vehiculo>();
          for (let unDato of datos) {
            miArray.push(new Vehiculo(unDato.id, unDato.marca, unDato.modelo, unDato.patente, unDato.foto, unDato.estado, unDato.duenio));
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  public listarVehiculosReiseriaPromesa(): Promise<Array<Vehiculo>> {
    let promesa: Promise<Array<Vehiculo>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesas('vehiculoRemis')
        .then(datos => {
          console.log(datos);
          debugger;
          let miArray: Array<Vehiculo> = new Array<Vehiculo>();
          for (let unDato of datos) {
            miArray.push(new Vehiculo(unDato.id, unDato.marca, unDato.modelo, unDato.patente, unDato.foto, unDato.estado, unDato.duenio,unDato.idDueño));
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  RegistrarVehiculo(vehiculo: Vehiculo, file: any): Promise<number> {
    let result: Promise<number> = this.miHttp.entregarVehiculo(vehiculo, file, 'vehiculo')
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  Habilitar(Legajo:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.habilitarVehiculo('habilitarVehiculo',Legajo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  Desabilitar(Legajo:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.desabilitarVehiculo('deshabilitarVehiculo',Legajo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
}
