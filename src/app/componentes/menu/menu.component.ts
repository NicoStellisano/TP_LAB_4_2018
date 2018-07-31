import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerificarService } from '../../servicios/verificar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  TIPO:string="";
  nombre:string;
  foto:string;
  constructor(public verificarService:VerificarService,public router:Router) { }

  IR(destino:string)
  {

    if(destino=="Viaje")
      localStorage.removeItem("modificarViaje");
    this.router.navigate(['/'+destino]);
  }

  salir()
  {
    localStorage.clear();
   this.IR("Login");

  }

  ngOnInit() {
    let tokenjs = localStorage.getItem("Token");
    let token:any = tokenjs!=null?JSON.parse(tokenjs):null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.TIPO = datos.respuesta.tipo;
        this.nombre = datos.respuesta.nombre;
        this.foto = datos.respuesta.foto!=null && datos.respuesta.foto!=""? "https://apistellisano.000webhostapp.com/apirestTPFinal/apirestV6-JWT-MW-POO/assets/usuarios/"+datos.respuesta.foto:"http://virtuale.usal.es/wp-content/uploads/2015/04/Sin-foto1.jpg";
        localStorage.setItem('foto',this.foto);

      }
    );
  }

}
