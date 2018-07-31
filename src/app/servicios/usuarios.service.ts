import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Usuario } from '../clases/usuario';
import { Remisero } from '../clases/remisero';
import { Vehiculo } from '../clases/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public miHttp: HttpService) { }
  public listarPersonaPromesa(): Promise<Array<Remisero>> {
    let promesa: Promise<Array<Remisero>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesas('')
        .then(datos => {
          console.log(datos);
          let miArray: Array<Remisero> = new Array<Remisero>();
          let vehiculo: Vehiculo;
          let remisero: Remisero;
          for (let unDato of datos) {
            if(unDato.id != null)
            {
              debugger;
              vehiculo = new Vehiculo(unDato.idvehiculo,unDato.marca,unDato.modelo,unDato.patente,unDato.fotoVehiculo,unDato.uvestado,1);
            }
            else
            {
              vehiculo = new Vehiculo(null,null,null,null,null,null,null);
            }
            miArray.push(new Remisero(unDato.legajo, unDato.usuario, unDato.nombre,unDato.contrasenia,unDato.tipo,unDato.foto,unDato.fechaDeNacimiento,unDato.estado,unDato.sexo,vehiculo));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
  BuscarUsuario(usuario: string, clave: string): Promise<Usuario> {
    let promesa: Promise<Usuario> = new Promise((resolve, reject) => {
      this.miHttp.buscarUsuario("traer", usuario, clave)
        .then(datos => {
          if (datos.length > 0) {
            let usuario = new Usuario(datos[0].legajo, datos[0].usuario, datos[0].nombre,datos[0].contrasenia, datos[0].tipo, datos[0].foto, datos[0].fechadeNacimiento, datos[0].estado, datos[0].sexo)
            resolve(usuario);
          }
          else {
            resolve(null);
          }
        })
        .catch(error => { console.log(error) });
    });
    return promesa;
  }
  RegistrarCliente(usuario: Usuario,file: any): Promise<boolean> {
    usuario.tipo = 2;
    usuario.estado = 0; 
    let result: Promise<boolean> = this.miHttp.entregarUsuario(usuario,file)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  RegistrarRemisero(usuario: Usuario,file: any): Promise<number> {
    usuario.tipo = 3;
    usuario.estado = 1; 
    let result: Promise<number> = this.miHttp.entregarUsuario(usuario,file)
      .then(datos => {
        return datos.respuesta;
      })
      .catch(error => {
        console.log(error);
        return 0;
      });
    return result;
  }
  RegistrarRemiseroConVehiculo(idUsuario: number,idVehiculo: number,update): Promise<number> {
    let result: Promise<number> = this.miHttp.entregarUsuarioVehiculo(idUsuario,idVehiculo,update,'UV')
      .then(datos => {
        return datos;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  Habilitar(Legajo:string):Promise<boolean>
  {
    let result: Promise<boolean> = this.miHttp.habilitarEmpleado('habilitar',Legajo)
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
    let result: Promise<boolean> = this.miHttp.desabilitarEmpleado('desabilitar',Legajo)
      .then(datos => {
        return true;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }

  ContestoEncuesta(legajo): Promise<any> {
    let result: Promise<any> = this.miHttp.contestoEncuesta('cencuesta', legajo)
      .then(datos => {
        return datos.respuesta[0].cant;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
    return result;
  }
  Contratar(Legajo:string):Promise<boolean>
  {
    debugger;
    let result: Promise<boolean> = this.miHttp.ContratarEmpleado('contratar',Legajo)
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
