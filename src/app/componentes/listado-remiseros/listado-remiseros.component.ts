import { Component, OnInit, Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { Remisero } from '../../clases/remisero';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HorariosComponent } from '../horarios/horarios.component';

@Component({
  selector: 'app-listado-remiseros',
  templateUrl: './listado-remiseros.component.html',
  styleUrls: ['./listado-remiseros.component.css']
})
export class ListadoRemiserosComponent implements OnInit {
  @Output() cambio: EventEmitter<any>= new EventEmitter<any>();  
  @ViewChild(HorariosComponent)
     private horarios: HorariosComponent;

  @Input()
  
  public listaUsuarios: Array<Remisero> = [];
  public miUsuariosService: UsuariosService;
  public miUsuario :Usuario;
  constructor(private spinnerService: Ng4LoadingSpinnerService,UsuariosService: UsuariosService) {
    this.miUsuariosService = UsuariosService
    this.miUsuario = new Usuario(null, null, null, null, null, null, null, null, null);

  }


  Cancelar()
  {
    location.reload();
  }
  Habilitar(legajo: string) { 
    this.spinnerService.show();
    debugger;

    this.miUsuariosService.Habilitar(legajo).then((datos) =>{

      if(datos)
      {
        this.cambio.emit();
      }
    
    })
    setInterval(() => {
      this.spinnerService.hide();
      },6000);
  }
  Contratar(legajo: string) { 
    this.spinnerService.show();

    this.miUsuariosService.Contratar(legajo).then((datos) =>{

      if(datos)
      {
        this.cambio.emit();
      }
     

    })
    setInterval(() => {
      this.spinnerService.hide();
      },6000);
  }
  Desabilitar(legajo: string) {
    this.spinnerService.show();

    this.miUsuariosService.Desabilitar(legajo).then((datos) =>{

      if(datos)
      {
        this.cambio.emit();
      }
    
    })
    setInterval(() => {
      this.spinnerService.hide();
      },6000);
   }

  ngOnInit() {

  }

  modal(usuarioo:Usuario)
  {
    this.miUsuario=usuarioo;
    document.getElementById('id01').style.display='block';
    this.horarios.miusuario=usuarioo;
    this.horarios.horarios();
  }

}
