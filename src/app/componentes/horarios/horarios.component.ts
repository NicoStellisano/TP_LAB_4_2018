import { Component, OnInit, Input } from '@angular/core';
import { HorarioService } from '../../servicios/horario.service';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { Horario } from '../../clases/horario';
import { Remisero } from '../../clases/remisero';
import { Vehiculo } from '../../clases/vehiculo';
import swal from 'sweetalert';
import { Usuario } from '../../clases/usuario';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  @Input('miusuario') miusuario:Usuario;
  horario: Horario;


  legajo: string;
  formulario: boolean = false;
  formularioVehiculo: boolean = false;
  listaVehiculo: Array<Vehiculo> = [];

  public gif = false;
  repetidor: any;
  idHorario: number = 0;
  idVehiculo: number = 0;
  patenteVehiculo: string = "";
  idRemisero: number = 0;
  constructor(private spinnerService: Ng4LoadingSpinnerService,public miServicioHorario: HorarioService, public miServicioVehiculo: VehiculosService, public miServicioUsuario :UsuariosService) {
    this.horario = new Horario(null, null, null, null, null, null);
    this.horario.remisero = new Remisero(null, null, null, null, null, null, null, null, null, null);
    this.horario.vehiculo = new Vehiculo(null, null, null, null, null, null, null);
  }

  horarios() {

    this.miServicioHorario.BuscarRemisero(this.miusuario.legajo.toString()).then(
      (datos) => {
        if (datos == null) {
          swal({
            title: "No se encontro remisero",
            icon: "warning",
          });
          this.formulario = false;
        }
        else {
          if (datos[0].estado == 3 || datos[0].estado == 1) {
            swal({
              title: "El remisero no esta trabajando actualmente",
              icon: "warning",
            });
            this.formulario = false;
          }
          else {
            this.formulario = true;
            this.idRemisero = datos[0].legajo;
            this.idVehiculo = datos[0].vehiculo.id;
            if (this.idVehiculo == null)
              this.formularioVehiculo = true;
            this.miServicioHorario.BuscarHorario(this.miusuario.legajo.toString()).then(
              (datos) => {
                if (datos != null) {
                  this.idHorario = datos[0].id;
                  this.horario.timeDesde = datos[0].timeDesde;
                  this.horario.timeHasta = datos[0].timeHasta;
                  this.idVehiculo = datos[0].vehiculo;
                }
                else {
                  this.idHorario = null;
                }
               
                  this.traerVehiculosDiponibles();
              }
            )
          }
        }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Error en el sistema"); }
      );
  }
  traerVehiculosDiponibles() {
    let leg=this.miusuario.legajo;
    this.miServicioVehiculo.listarVehiculosReiseriaPromesa().then(
      (datos) => {
      debugger;
       var dat=   datos.filter(function(d){
         debugger;
       if(d.dueño==1)
       {
        if(d.idDuenio==leg)
        return d;
       }else{
         return d;
       }
          })
    debugger;
        this.listaVehiculo = dat;
      });

  }
  guardarHorario() {
this.spinnerService.show();
            this.horario.remisero.legajo = this.idRemisero;
            this.horario.vehiculo.id = this.idVehiculo;
            this.horario.id = this.idHorario;
            this.miServicioHorario.guardarHorario(this.horario).then((datos) => {
              swal({
              title: "Horario actualizado",
              icon: "success",
            });
            })      
         
          this.spinnerService.hide();
        
   

  }
  elegir(id: number) {
    var flag="15";
    this.listaVehiculo.forEach(element => {
      if(element.idDuenio==this.miusuario.legajo)
      flag="false";
    });
    debugger;
    this.miServicioUsuario.RegistrarRemiseroConVehiculo(this.miusuario.legajo,id,flag).then((datos)=>{
      swal({
        title: "Vehículo elegido",
        icon: "success",
      });
      })      
      this.horarios();
    }
    
 ngOnInit(){

 }
}
