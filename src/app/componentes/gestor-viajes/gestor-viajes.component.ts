import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ViajesService } from '../../servicios/viajes.service';
import { HorarioService } from '../../servicios/horario.service';
import { VerificarService } from '../../servicios/verificar.service';
import { HttpService } from '../../servicios/http.service';
import { Viaje } from '../../clases/viaje';
import { Horario } from '../../clases/horario';
import { Remisero } from '../../clases/remisero';
import { Vehiculo } from '../../clases/vehiculo';
import {AutoFoto} from '../../clases/autoFoto';
import { RemiseroFoto } from '../../clases/remiseroFoto';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-gestor-viajes',
  templateUrl: './gestor-viajes.component.html',
  styleUrls: ['./gestor-viajes.component.css']
})
export class GestorViajesComponent implements OnInit {

  TIPO: number;
  legajo: number;
  listaViajes: Array<any> = [];
  listaTotal:  Array<any> = [];
  listaHorarios: Array<any> = [];
  miViaje: Viaje;
  mostrar: boolean = false;
  dir = undefined;
  motivo: string = "";

  latD:number = 0;
  latH:number = 0;
  lngD:number = 0;
  lngH:number = 0;
  pagook;

  horarioSeleccion;
  estadoSeleccion = "0";

  constructor(private spinnerService: Ng4LoadingSpinnerService,private router: Router, public http: HttpService,public UsuariosServicio: UsuariosService, public ViajesServicio: ViajesService, public HorariosServicio: HorarioService, public verificarService: VerificarService) {
  }
  public llamaServicePromesa() {
    if (this.TIPO == 1) {
      this.ViajesServicio.listarViajesPromesa().then(
        (listadoPromesa) => {
          this.listaViajes = listadoPromesa;
          this.listaTotal = listadoPromesa;
        }
      );
    }
    if (this.TIPO == 3) {
      this.ViajesServicio.listarViajesRemiseroPromesa(this.legajo).then(
        (listadoPromesa) => {
          this.listaViajes = listadoPromesa;
          this.listaTotal = listadoPromesa;
        }
      );
    }
    if(this.TIPO==2)
    {
      
        this.ViajesServicio.listarViajesClientePromesa(this.legajo).then(
          (listadoPromesa) => {
            this.listaViajes = listadoPromesa;
            this.listaViajes.forEach(element => {   
              element.FotoCliente=element.FotoCliente?element.FotoCliente:localStorage.getItem('foto');
            });
            if(this.listaViajes.find(a=>a.estado==4))
            {
              let contesto = false;
              this.UsuariosServicio.ContestoEncuesta(this.legajo).then((datos) => {
                if(datos==0)
                {
                  this.router.navigate(['/Encuesta']);
    
                }
              })
    
             
            }
          }
        );


       
      }
    
  }

  buscar(){
    var lista :Array<Viaje> = []
    this.listaViajes = [];
    if(this.estadoSeleccion != "0" || (this.horarioSeleccion != null && this.horarioSeleccion != ""))
    {
      for(let i = 0;i<this.listaTotal.length;i++)
      { 
        if(this.estadoSeleccion != "0" && (this.horarioSeleccion == null || this.horarioSeleccion == "")){
          if(this.listaTotal[i].estado.toString() == this.estadoSeleccion)
            lista.push(this.listaTotal[i]);
        }
        if(this.estadoSeleccion == "0" && (this.horarioSeleccion != null || this.horarioSeleccion != "")){
          var dataR = this.horarioSeleccion.split("-");
          var dataB = this.listaTotal[i].horario.split("-");
          if(dataR[0] == dataB[0] && dataR[1] == dataB[1] && dataR[2] == dataB[2].split(" ")[0])
            lista.push(this.listaTotal[i]);
        }
        if(this.estadoSeleccion != "0" && (this.horarioSeleccion != null && this.horarioSeleccion != "")){
          var dataR = this.horarioSeleccion.split("-");
          var dataB = this.listaTotal[i].horario.split("-");
          if(dataR[0] == dataB[0] && dataR[1] == dataB[1] && dataR[2] == dataB[2].split(" ")[0] && this.listaTotal[i].estado.toString() == this.estadoSeleccion)
            lista.push(this.listaTotal[i]);
        }
        
      }
      this.listaViajes = lista;
    }
    else{
      this.listaViajes = this.listaTotal;
    }
  }

  Ver(viaje: Viaje) {
    this.miViaje = new Viaje(viaje.id, viaje.remisero, viaje.vehiculo, viaje.legajoCliente, viaje.latDesde, viaje.latHasta, viaje.lngDesde, viaje.lngHasta, viaje.duracion, viaje.distancia, viaje.precio, viaje.cantidad
      , viaje.comodidad, viaje.medioDePago, viaje.estado, viaje.horario,viaje.FotoCliente);
    this.miViaje.horario = this.miViaje.horario.replace('T', " ");
    this.mostrar = true;

    var viajeJson = JSON.stringify(this.miViaje);
    localStorage.setItem('modificarViaje',viajeJson);
    this.router.navigate(['/Viaje']);
  }
   ListarHorarios(miViaje) {
     debugger;
    let horario = miViaje.horario.split(" ");
    this.HorariosServicio.BuscarHorarioViaje(horario[1]).then((datos) => {
      let dataList = [];
      for (let i = 0; i < datos.array.length; i++) {
        let val: any = {};
        val = datos.array[i];
        val.foto = datos.fotos[i];
        dataList.push(val);
      }
      this.listaHorarios = dataList;
      this.miViaje=miViaje;
    });
  }
  trazarRuta() {
    this.latD = parseFloat(this.miViaje.latDesde.toString());
    this.latH = parseFloat(this.miViaje.latHasta.toString());
    this.lngD = parseFloat(this.miViaje.lngDesde.toString());
    this.lngH =  parseFloat(this.miViaje.lngHasta.toString());
    this.dir = {
      destination: { lat: this.latH, lng: this.lngH},
      origin: { lat: this.latD, lng: this.lngD },
      travelMode: 'DRIVING',
      transitOptions: {
        departureTime: new Date('2018/03/20 12:00'),
        modes: ['BUS']
      }
    }
  }
  Asignar(horario: any) {
    debugger;
    //this.miViaje.remisero = new RemiseroFoto(viaje.remisero.legajoRemisero, viaje.remisero.FotoRemisero);
    this.miViaje.vehiculo = new AutoFoto(horario.vehiculo,null);
    this.miViaje.estado = 3;
    this.miViaje.remisero=new RemiseroFoto(horario.remisero,null);
   // this.miViaje.vehiculo.id = viaje.vehiculo;
    this.ViajesServicio.ActualizarViaje(this.miViaje).then((datos) => {
     swal({
          title: "Remisero Asignado",
          icon: "success",
        });
        document.getElementById('id02').style.display='none';
      this.llamaServicePromesa();
    })
  }
  cancelar(viaje: Viaje) {
    this.miViaje = viaje;
  }
  Cancelar() {
    this.miViaje.estado = 2;
    this.miViaje.comodidad = this.motivo;
    this.ViajesServicio.ActualizarViaje2(this.miViaje).then((datos) => {
      swal({
          title: "Viaje Cancelado",
          icon: "success",
        });
    })
  }

MiViaje(viaje:Viaje){
this.miViaje=viaje;
}

  Finalizar(){
    debugger;
    var viaje =this.miViaje;
    var opt = this.pagook;
    switch(opt)
    {
      case "0":
      viaje.comodidad="Pagado en regla";
      break;
      case "1":
      viaje.comodidad="Pagado con otro método del especificado";
      if(viaje.medioDePago=="Efectivo")
      viaje.medioDePago="A pagar";
      else
      viaje.medioDePago="Efectivo";

      break;
      case "2":
      viaje.comodidad="No pagado";
      break;
    }
    debugger;
    viaje.estado = 4;
    this.ViajesServicio.ActualizarViaje2(viaje).then((datos) => {
      swal({
          title: "Viaje Finalizado",
          icon: "success",
        });
        this.llamaServicePromesa();
    })
  }
  ngOnInit() {
    this.spinnerService.show();
    this.pagook = "0";
    let tokenjs = localStorage.getItem("Token");
    let token: any = tokenjs != null ? JSON.parse(tokenjs) : null;
    this.verificarService.recuperToken(token).then(
      (datos) => {
        this.TIPO = datos.respuesta.tipo;
        this.legajo = datos.respuesta.legajo;
        this.llamaServicePromesa();
        this.spinnerService.hide();
    
      }
    );

    
  }

}
