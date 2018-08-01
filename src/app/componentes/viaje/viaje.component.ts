import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ViajesService } from '../../servicios/viajes.service';
import { VerificarService } from '../../servicios/verificar.service';
import { HttpService } from '../../servicios/http.service';
import { Viaje } from '../../clases/viaje';
import swal from 'sweetalert';
import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
//import { Remisero} from '../../clases/remisero';
//import { Vehiculo} from '../../clases/vehiculo';


import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css'],
})
export class ViajeComponent implements OnInit {

  repetidor: any;

  captchas = [
    {
      img: "https://s3-us-west-1.amazonaws.com/suzukiautos/anuncios/58e3c2b5dc702.png",
      value: "auto"
    },
    {
      img: "http://deplanos.com/wp-content/uploads/2016/09/casa.jpeg",
      value: "casa"
    },
    {
      img: "https://fotografias.lasexta.com/clipping/cmsimages01/2017/02/07/364CAAAC-A60E-43BB-8FED-05AA0B8F3AF9/58.jpg",
      value: "perro"
    }
  ];
  captcha: any = {};
  captch: string = "";
  captchConfirm: boolean = false;

  miViaje: Viaje;
  miViajeServicio: ViajesService;
  verificarService: VerificarService;
  mihttp: HttpService;

  localidadDesde: string;
  calleDesde: string;
  numeroDesde: string;
  localidadHasta: string;
  calleHasta: string;
  numeroHasta: string;
  direccionDesde: string = "";
  direccionHasta: string = "";
  legajo: number;
  ruta = false;
  nombre:string;
  foto:string;
  latDesde: number = 0;
  lngDesde: number = 0;
  latHasta: number = 0;
  lngHasta: number = 0;
  duracion: number = 1;
  distancia: number = 0;
  horarioOpts;
  horario:string;
  precio: number = 0;
  cant: number = 1
  medioDePago: string = "Efectivo";
  comodidad: string = "";
  zoom: Number = 14;
 horas:string;
 minutos:string;
 modificar:boolean;
 TIPO:number;
 estado;
 dia;
 mini:string;
  //private exponentialStrength: ExponentialStrengthPipe; 

  dir = undefined;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router, http: HttpService, ViajesServicio: ViajesService, verificarService: VerificarService) {
    this.miViaje = new Viaje(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null);
    this.mihttp = http;
    this.miViajeServicio = ViajesServicio;
    this.verificarService = verificarService;
  }

  confirmarCaptcha() {
   this.captch= this.captch.toLowerCase();
    if (this.captch == this.captcha.value)
      this.captchConfirm = true;
      else
      {
        swal({
          title: "Respuesta incorrecta",
          icon: "warning",
        });
        let auxCaptcha= this.captcha;
        while(this.captcha==auxCaptcha)
        this.captcha = this.captchas[Math.floor((Math.random() * 3) + 1) - 1];
      
      }
 
  }

hora()
{
  if(isNaN(parseInt(this.horas)) || parseInt(this.horas)>24 || parseInt(this.horas)<0 || this.horas.length>2)
  this.horas=new Date().getHours().toString();
  else if(this.horas >= new Date().getHours().toString())
  {
  }
  else{
    this.horas=new Date().getHours().toString();
  }

  if(this.horas.length==1)
  {
    this.horas='0'+this.horas;
  }

  this.min();

}

  /* hora()
  {
    if(isNaN(parseInt(this.horas)))
    this.horas="00";
    else if((parseInt(this.horas) < 6 && parseInt(this.horas) > 0) ||
    (parseInt(this.horas) > 6 && parseInt(this.horas) >= new Date().getHours()))
    {
       if(this.horas.length==1)
       {
         this.horas='0'+this.horas;
       }
       if((parseInt(this.horas) < 6 && new Date().getHours()<6) || (parseInt(this.horas) > 6 && new Date().getHours()>6))
       {
          this.dia = new Date().getDate();
       }else{
         if (parseInt(this.horas) < 6 && new Date().getHours()>6)
         {
           var date= new Date();
           this.dia = new Date(date.getFullYear(),date.getMonth(),date.getDay()+1);

         }
       }
    }else{
      this.horas=new Date().getHours().toString();
    }
  } */

  min()
  {
    if(isNaN(parseInt(this.minutos)) || this.minutos.length>2)
    this.minutos=(new Date().getMinutes()+5).toString();
    else if(new Date().getMinutes()+5>60)
    { 
      this.minutos=(new Date().getMinutes()+5-60).toString();
      //this.horas=(parseFloat(this.horas)+1).toString();
    }
    else if(parseInt(this.minutos)>=60 || (parseInt(this.minutos)<new Date().getMinutes()+5 && parseInt(this.horas) == new Date().getHours()))
    this.minutos=(new Date().getMinutes()+5).toString();

    if(this.minutos.length==1)
    {
      this.minutos='0'+this.minutos;
    }

  }

  Trazar() {
    debugger;
    this.direccionDesde = this.localidadDesde + "-" + this.calleDesde.replace(/\s/g, "-") + "-" + this.numeroDesde;
    this.direccionHasta = this.localidadHasta + "-" + this.calleHasta.replace(/\s/g, "-") + "-" + this.numeroHasta;
    this.mihttp.httpGetRuta(this.direccionDesde, this.direccionHasta)
      .then(data => {
        this.latDesde = data.origin.lat;
        this.lngDesde = data.origin.lng;
        this.latHasta = data.destination.lat;
        this.lngHasta = data.destination.lng;
        this.duracion = Math.round(data.duration.value);
        this.distancia = Math.round(data.distance.value);
        this.precio =  this.distancia<1000?60: 60+((this.distancia-1000)/100);
        this.trazarRuta();
      })
      .catch(ex=>{
        swal("Ingrese un origen y destino correctos",{icon:"warning"});
      });
  }
  trazarRuta() {
    this.ruta = true;
    this.dir = {
      destination: { lat: this.latHasta, lng: this.lngHasta },
      origin: { lat: this.latDesde, lng: this.lngDesde },
      travelMode: 'DRIVING',
      transitOptions: {
        departureTime: new Date('2018/03/20 12:00'),
        modes: ['BUS']
      }
    }
  }
  Crearviaje() {
    if(this.horas!="00" || this.minutos!="00")
    {
      this.spinnerService.show();

      if(this.horario=="")
      {
        swal({
          title: "Elija un horario correcto",
          icon: "warning",
        });
        this.spinnerService.hide();
        return;
      }
    
    if(this.modificar)
    {
debugger;
      this.miViaje.horario=this.horario.replace('T',' ');/* new Date().toISOString().split('T')[0]+' '+this.horas+':'+this.minutos; */
      this.miViaje.distancia=this.distancia;
      this.miViaje.duracion=this.duracion;
      this.miViaje.precio=this.precio;
      this.miViaje.comodidad=this.comodidad;
      this.miViaje.FotoCliente = localStorage.getItem('foto');

      this.Actualizar();
    }else{
      this.repetidor = setInterval(() => {
        this.miViaje.cantidad = this.cant;
        this.miViaje.comodidad = this.comodidad;
        this.miViaje.distancia = this.distancia;
        this.miViaje.duracion = this.duracion;
        debugger;
        this.miViaje.horario=this.horario.replace('T',' ');
        this.miViaje.latDesde = this.latDesde;
        this.miViaje.latHasta = this.latHasta;
        this.miViaje.legajoCliente = this.legajo;
        this.miViaje.lngDesde = this.lngDesde;
        this.miViaje.lngHasta = this.lngHasta;
        this.miViaje.medioDePago = this.medioDePago;
        this.miViaje.precio = this.precio;
        this.miViaje.FotoCliente = localStorage.getItem('foto');
        this.miViajeServicio.RegistrarViaje(this.miViaje).then(
          (datos) => {
            debugger;
            clearInterval(this.repetidor);
            this.spinnerService.hide();
            swal({
              title: "Viaje registrado",
              icon: "success",
            });
            this.router.navigate(['/gestorViajes']);
          }
        );
      }, 3000);
    }
  }else{
    swal({
      title: "El horario es inválido",
      icon: "warning",
    });
  }
  }
  cantChange()
  {
    if(this.cant>4 || this.cant<0)
    this.cant=1;
  }

  trazarRutaM() {
    var latD = parseFloat(this.miViaje.latDesde.toString());
    var latH = parseFloat(this.miViaje.latHasta.toString());
   var lngD = parseFloat(this.miViaje.lngDesde.toString());
    var lngH =  parseFloat(this.miViaje.lngHasta.toString());
    this.dir = {
      destination: { lat: latH, lng: lngH},
      origin: { lat: latD, lng: lngD },
      travelMode: 'DRIVING',
      transitOptions: {
        departureTime: new Date('2018/03/20 12:00'),
        modes: ['BUS']
      }
    }
   
  }

  Nuevo()
  {
    localStorage.removeItem('modificarViaje');
    this.ngOnInit();
  }
  Actualizar() {
    this.repetidor = setInterval(() => {
      this.miViajeServicio.ActualizarViaje(this.miViaje).then((datos) => {
        this.spinnerService.hide();
        clearInterval(this.repetidor);
        swal({
          title: "Viaje modificado",
          icon: "success",
        });
      });
      this.modificar=false;
      localStorage.removeItem('modificarViaje');
      this.router.navigate(['/gestorViajes']);
    }, 3000);
  }
  ngOnInit() {
    this.spinnerService.hide();

this.modificar=false;
    if(localStorage.getItem('modificarViaje')!=null)
    {
      this.modificar=true;
     var viaje = JSON.parse(localStorage.getItem('modificarViaje'));
     this.miViaje = new Viaje(viaje.id, null, null, viaje.legajoCliente, viaje.latDesde, viaje.latHasta, viaje.lngDesde, viaje.lngHasta, viaje.duracion, viaje.distancia, viaje.precio, viaje.cantidad
      , viaje.comodidad, viaje.medioDePago, viaje.estado, viaje.horario,viaje.FotoCliente);
      debugger;
/*       this.horas=new Date(this.miViaje.horario.toString().replace('T',' ')).getHours().toString();
      this.minutos=new Date(this.miViaje.horario.toString().replace('T',' ')).getMinutes().toString();
      if(this.minutos.length==1)
        this.minutos='0'+this.minutos;
      if(this.horas.length==1)
        this.horas='0'+this.horas; */
        this.horario = viaje.horario.replace(' ','T');
        let min= new Date(new Date((new Date().getTime()-10800000)).toISOString().split('.')[0]);
        min.setHours(0);
        this.mini = new Date(min).toISOString().split('.')[0];
      this.distancia = this.miViaje.distancia;
      this.duracion = this.miViaje.duracion;
      this.precio = this.miViaje.precio;
      this.comodidad=this.miViaje.comodidad;
      this.estado=this.miViaje.estado;
      this.trazarRutaM();
      

    }else{
      this.estado=1;
 /*      this.horas=new Date().getHours().toString();
    this.minutos=(new Date().getMinutes()+5).toString();
    this.min();
    this.hora(); */
    this.horario = new Date((new Date().getTime()-10800000)).toISOString().split('.')[0];
let min= new Date(this.horario);
min.setHours(0);
this.mini = new Date(min).toISOString().split('.')[0];
    this.localidadDesde = "Temperley";
    this.calleDesde = "Riglos";
    this.numeroDesde = "609";
    this.localidadHasta = "Avellaneda";
    this.calleHasta = "Mitre";
    this.numeroHasta = "750";
    }
    
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.legajo = datos.respuesta.legajo;
        this.nombre = datos.respuesta.nombre;
        this.foto = "https://apistellisano.000webhostapp.com/apirestTPFinal/apirestV6-JWT-MW-POO/assets/usuarios/"+datos.respuesta.foto;
        this.TIPO=datos.respuesta.tipo;
      });
    this.captcha = this.captchas[Math.floor((Math.random() * 3) + 1) - 1];


    
  }



}

