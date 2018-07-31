import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Encuesta } from "../clases/encuesta";
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(public miHttp: HttpService) {
  }

  guardarEncuesta(encuesta: Encuesta) {
    let result: Promise<number> = this.miHttp.entregarEncuesta(encuesta, 'guardarEncuesta')
      .then(datos => {
        return datos;
      })
      .catch(error => {
        console.log(error);
        return 0;
      });
    return result;
  }
  listarEncuestaPromesa()
  {
    let promesa: Promise<Array<Encuesta>> = new Promise((resolve, reject) => {
      this.miHttp.dameTodasLasPromesas('encuestas')
        .then(datos => {
          console.log(datos);
          let miArray: Array<Encuesta> = new Array<Encuesta>();
          for (let unDato of datos) {
            miArray.push(new Encuesta(unDato.id, unDato.pregunta1, unDato.pregunta2, unDato.pregunta3,unDato.pregunta4,unDato.pregunta5,unDato.pregunta6,unDato.pregunta7,unDato.pregunta8,unDato.idCliente));                        
          }
          resolve(miArray);
        })
        .catch(error => { console.log(error); });
    }
    );
    return promesa;
  }
}
