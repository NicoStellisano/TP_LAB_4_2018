import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';
import { EncuestaService } from '../../servicios/encuesta.service';
import { Encuesta } from '../../clases/encuesta';
import swal from 'sweetalert';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  miEncuesta: Encuesta;
  respuesta41: boolean = false;
  respuesta42: boolean = false;
  respuesta43: boolean = false;
  respuesta51: boolean = false;
  respuesta52: boolean = false;

  public gif = false;
  repetidor: any;

  constructor(private spinnerService: Ng4LoadingSpinnerService,public verificarService: VerificarService, public encuestaService: EncuestaService, private router: Router) {
    this.miEncuesta = new Encuesta(null, null, null, null, null, null, null, null, null, null);
    this.miEncuesta.pregunta1 = "Bueno";
    this.miEncuesta.pregunta2 = "Si";
    this.miEncuesta.pregunta3 = "Puntual";
    this.miEncuesta.pregunta4 = "Excelente";
    this.miEncuesta.pregunta5 = "";
    this.miEncuesta.pregunta6 = "Todos";
    this.miEncuesta.pregunta7 = "10";
    this.miEncuesta.pregunta8 = "";
  }

 
  cambiarWeb() {
    if (this.respuesta51) {
      this.miEncuesta.pregunta5 = "Agradable";
      if (this.respuesta52)
        this.miEncuesta.pregunta5 += "-Cumple con su objetivo";
    }
    else {
      if (this.respuesta52)
        this.miEncuesta.pregunta5 = "Cumple con su objetivo";
      else
        this.miEncuesta.pregunta5 = "";
    }
  }
  enviar() {
    this.spinnerService.show();
    debugger;
    this.repetidor = setInterval(() => {
    this.encuestaService.guardarEncuesta(this.miEncuesta).then((datos: any) => {
      this.spinnerService.show();
      clearInterval(this.repetidor);
      if (datos.respuesta != -1) {
        debugger;
        swal({
              title: "Encuesta guardada",
              icon: "success",
            });
        this.router.navigate(['/Principal']);
      }
      else{
        swal({
              title: "Usted ya realizo la encuesta",
              icon: "warning",
            });
        this.router.navigate(['/Principal']);
      }
    });
    }, 3000);
  }
  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.miEncuesta.idCliente = datos.respuesta.legajo;
      }
    );
  }

}
