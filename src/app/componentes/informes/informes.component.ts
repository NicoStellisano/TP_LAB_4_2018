import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../../servicios/viajes.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { metrosAKilometrosPipe } from '../../metrosAKilometros.pipe';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  mes: number = 7;
  anio: number = 2018;
  listaDeDatos: Array<any> = [];
  mostrar = false;
  public gif = false;
  repetidor: any;
  constructor(private spinnerService: Ng4LoadingSpinnerService,public miViajesService: ViajesService) { }
  buscar() {
    this.listaDeDatos = [];
    this.llamaServices();
  }
  llamaServices() {
    this.spinnerService.show();
      this.miViajesService.traerInformes(this.mes, this.anio).then((datos) => {
        debugger;
        for (let i = 0; i < datos.length; i++) {
          var item: any = {};
          item.Cliente = datos[i].Cliente;
          item.MedioPago = datos[i].MedioPago;
          item.Mensaje = datos[i].Comodidad;
          item.Precio = '$' + datos[i].Precio;
          item.Pasajeros = datos[i].Pasajeros;
          item.Duracion = datos[i].Duracion + " m";
          item.Distancia = datos[i].Distancia;
          item.Horario = datos[i].Horario;
          item.Remisero = datos[i].Remisero == null ? "No asignado" : datos[i].Remisero + " N° legajo: " + datos[i].LegajoRemisero;
          //item.LegajoRemisero = datos[i].LegajoRemisero == null ? 0:datos[i].LegajoRemisero;
          item.Vehiculo = datos[i].Vehiculo == null ? "No asignado" : datos[i].Vehiculo + " patente: " + datos[i].Patente;
          //item.Patente = datos[i].Patente == null ? "":datos[i].Patente;
          switch (datos[i].Estado) {
            case "1":
              item.Estado = "Iniciado";
              break;
            case "2":
              item.Estado = "Cancelado";
              break;
            case "3":
              item.Estado = "En proceso";
              break;
            case "4":
              item.Estado = "Finalizado";
              break;
          }
          this.listaDeDatos.push(item);
          debugger;
        }
        this.mostrar = true;
this.spinnerService.hide();
      });
  }
  ExportarCSV() {
    this.gif = true;
    this.repetidor = setInterval(() => {
      const options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: ',',
        showLabels: true,
        showTitle: false,
        useBom: true,
        headers: ['Cliente',
          'Horario',
          'Precio',
          'Medio de pago',
          'Distancia',
          'Duracion',
          'Cantidad de Pasajeros',
          'Mensaje',
          'Remisero']
      };
      var data: Array<any> = [];
      for (let i = 0; i < this.listaDeDatos.length; i++) {
        var dato = {
          Cliente: this.listaDeDatos[i].Cliente,
          Horario: this.listaDeDatos[i].Horario,
          Precio: this.listaDeDatos[i].Precio,
          MedioPago: this.listaDeDatos[i].MedioPago,
          Distancia: (parseFloat(this.listaDeDatos[i].Distancia)/1000).toFixed(1) +" km",
          Duracion: this.listaDeDatos[i].Duracion,
          Cantidad: this.listaDeDatos[i].Pasajeros,
          Mensaje: this.listaDeDatos[i].Mensaje,
          Remisero: this.listaDeDatos[i].Remisero
         
        }
        data.push(dato);
      }
      new Angular2Csv(data, 'Informe', options);
      this.gif = false;
      clearInterval(this.repetidor);
    }, 3000);
  }
  ExportarPDF(){
     this.gif = true;
      var columns = [
      { title: "Cliente", dataKey: "client" },
      { title: "Horario", dataKey: "hour" },
      { title: "Remisero", dataKey: "remis" },
     // //  { title: "Vehiculo", dataKey: "drive" },
     { title: "Precio", dataKey: "price" },
      { title: "Medio de pago", dataKey: "paid" },
    // //   { title: "Distancia", dataKey: "distance" },
   // //    { title: "Duración", dataKey: "duration" },
   // //    { title: "Pasajeros", dataKey: "cant" },
    // //   { title: "Mensaje", dataKey: "message" },
    ];
    var rows :Array<any> = []; 
    for (let i = 0; i < this.listaDeDatos.length; i++) {
        var dato = {
          client : this.listaDeDatos[i].Cliente,
          hour: this.listaDeDatos[i].Horario,
          remis: this.listaDeDatos[i].Remisero,
       //   drive: this.listaDeDatos[i].Vehiculo
          price: this.listaDeDatos[i].Precio,
          paid: this.listaDeDatos[i].MedioPago,
         // distance: this.listaDeDatos[i].Distancia,
        //  duration: this.listaDeDatos[i].Duracion,
         // cant: this.listaDeDatos[i].Pasajeros,
        //  message: this.listaDeDatos[i].Mensaje,
        }
        rows.push(dato);
      }
    // Only pt supported (not mm or in)
    var mes = this.mes;
    var anio = this.anio;
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
      styles: { fillColor: [100, 255, 255]},
      //margin: { top: 60 },
      addPageContent: function (data) {
        doc.text("Informe del "+mes+" del "+anio+":", 40, 30);
      }
    });
    doc.save('Informe.pdf');
  }
  ngOnInit() {
    this.spinnerService.hide();

  }

}
