import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculosService} from '../../servicios/vehiculos.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-listado-vehiculos',
  templateUrl: './listado-vehiculos.component.html',
  styleUrls: ['./listado-vehiculos.component.css']
})
export class ListadoVehiculosComponent implements OnInit {
  @Output() cambio: EventEmitter<any>= new EventEmitter<any>();  
  @Input()
  public listaVehiculo: Array<Vehiculo> = [];
  public miServicioVehiculo: VehiculosService;
  constructor(private spinnerService: Ng4LoadingSpinnerService,ServicioVehiculo:VehiculosService) {
    this.miServicioVehiculo = ServicioVehiculo;
   }
  Habilitar(id: string) { 
    this.spinnerService.show();

    this.miServicioVehiculo.Habilitar(id).then((datos) =>{
      if(datos)
      {
        this.cambio.emit();
      }
    })
    setInterval(() => {
      this.spinnerService.hide();
      },6000);
  }
  Desabilitar(id: string) {
    this.spinnerService.show();

    this.miServicioVehiculo.Desabilitar(id).then((datos) =>{
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

}
