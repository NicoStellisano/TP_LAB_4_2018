import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../servicios/encuesta.service';
import { Encuesta } from "../../clases/encuesta";
import { Chart } from 'chart.js';
@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  listaEncuesta: Array<Encuesta> = [];

  tipo = "";
  ChartLabelsGrafico1: Array<string> = ["Malo", "Normal","Bueno"];
  ChartLabelsGrafico2: Array<string> = ["Si", "No", "Indiqué otra"];
  ChartLabelsGrafico3: Array<string> = ["Terrible", "Algo tarde", "Puntual"];
  ChartLabelsGrafico4: Array<string> = ["Mala","Aceptable","Excelente"];
  ChartLabelsGrafico5: Array<string> = ["Agradable","Cumple su objetivo"];
  ChartLabelsGrafico6: Array<string> = ["Nadie","Conocidos","Todos"];
  ChartLabelsGrafico7: Array<string> = ["1","2","3","4","5","6","7","8","9","10"];
  ChartDataGrafico1: Array<number> = [0, 0,0];
  ChartDataGrafico2: Array<number> = [0, 0, 0];
  ChartDataGrafico3: Array<number> = [0, 0, 0];
  ChartDataGrafico4: Array<number> = [0, 0, 0];
  ChartDataGrafico5: Array<number> = [0, 0];
  ChartDataGrafico6: Array<number> = [0, 0, 0];
  ChartDataGrafico7: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  pieChartType: string = 'pie';

  constructor(public miEncuestaservicio: EncuestaService) { }
  public llamaServicePromesa() {
    this.miEncuestaservicio.listarEncuestaPromesa().then(
      (listadoPromesa) => {
        this.listaEncuesta = listadoPromesa;
        this.mostrarGraficos();
      }
    );
  }
  public mostrarGraficos() {
    for (let i = 0; i < this.listaEncuesta.length; i++) {

      //Datos grafico 1
      switch(this.listaEncuesta[i].pregunta1){
        case "Malo":
        this.ChartDataGrafico1[0]++;
        break;
        case "Normal":
        this.ChartDataGrafico1[1]++;
        break;
        case "Bueno":
        this.ChartDataGrafico1[2]++;
        break;
      }

      //Datos grafico 2  
      switch(this.listaEncuesta[i].pregunta2){
        case "Si":
        this.ChartDataGrafico2[0]++;
        break;
        case "No":
        this.ChartDataGrafico2[1]++;
        break;
        case "Indiqué otra":
        this.ChartDataGrafico2[2]++;
        break;
      }

      //Datos grafico 3  
      switch(this.listaEncuesta[i].pregunta3){
        case "Terrible":
        this.ChartDataGrafico3[0]++;
        break;
        case "Algo tarde":
        this.ChartDataGrafico3[1]++;
        break;
        case "Puntual":
        this.ChartDataGrafico3[2]++;
        break;
      }

      //Datos grafico 4
      switch(this.listaEncuesta[i].pregunta4){
        case "Mala":
        this.ChartDataGrafico4[0]++;
        break;
        case "Aceptable":
        this.ChartDataGrafico4[1]++;
        break;
        case "Excelente":
        this.ChartDataGrafico4[2]++;
        break;
      }

      //Datos grafico 5
      if(this.listaEncuesta[i].pregunta5 != "")
      { 
        var data = this.listaEncuesta[i].pregunta5.split("-");

        for(let y=0; y<data.length;y++)
        {
          if(data[y] == "Agradable")
            this.ChartDataGrafico5[0]++
          else if(data[y] == "Cumple su objetivo")
            this.ChartDataGrafico5[1]++     
        } 
      }  
      //Datos grafico 6  
      switch(this.listaEncuesta[i].pregunta6){     
          case "Nadie":
          this.ChartDataGrafico6[0]++;
          break;
          case "Conocidos":
          this.ChartDataGrafico6[1]++;
          break;
          case "Todos":
          this.ChartDataGrafico6[2]++;
          break;
      }
      //Datos grafico 7  
      switch(this.listaEncuesta[i].pregunta7){
        case "1":
          this.ChartDataGrafico7[0]++;
          break;
        case "2":
          this.ChartDataGrafico7[1]++;
          break;
        case "3":
          this.ChartDataGrafico7[2]++;
          break;
        case "4":
          this.ChartDataGrafico7[3]++;
          break;
        case "5":
          this.ChartDataGrafico7[4]++;
          break;
        case "6":
          this.ChartDataGrafico7[5]++;
          break;
        case "7":
          this.ChartDataGrafico7[6]++;
          break;
        case "8":
          this.ChartDataGrafico7[7]++;
          break;
        case "9":
          this.ChartDataGrafico7[8]++;
          break;
        case "10":
          this.ChartDataGrafico7[9]++;
          break;
      }
      
    }

    var graf1 = document.getElementById("grafico1");
    var myGraf1 = new Chart(graf1, {
      type: this.pieChartType,
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico1,
        datasets: [{
          data: this.ChartDataGrafico1,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 0, 0, 0.3)',
            'rgba(230, 0, 0, 0.4)'
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf2 = document.getElementById("grafico2");
    var myGraf2 = new Chart(graf2, {
      type: this.pieChartType,
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico2,
        datasets: [{
          data: this.ChartDataGrafico2,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 255, 0, 0.4)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf3 = document.getElementById("grafico3");
    var myGraf3 = new Chart(graf3, {
      type: this.pieChartType,
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico3,
        datasets: [{
          data: this.ChartDataGrafico3,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 255, 0, 0.4)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(230, 0, 0, 0.4)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf4 = document.getElementById("grafico4");
    var myGraf4 = new Chart(graf4, {
      type: "bar",
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico4,
        datasets: [{
          data: this.ChartDataGrafico4,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 0, 0, 0.3)',
            'rgba(230, 0, 0, 0.4)',
            'rgba(75, 192, 192, 0.2)',
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf5 = document.getElementById("grafico5");
    var myGraf5 = new Chart(graf5, {
      type: "bar",
      data: {
        labels: this.ChartLabelsGrafico5,
        datasets: [{
          data: this.ChartDataGrafico5,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 0, 0, 0.3)',
            'rgba(230, 0, 0, 0.4)'
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf6 = document.getElementById("grafico6");
    var myGraf6 = new Chart(graf6, {
      type: "doughnut",
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico6,
        datasets: [{
          data: this.ChartDataGrafico6,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 0, 0, 0.3)',
            'rgba(230, 0, 0, 0.4)',
            'rgba(153, 102, 255, 0.2)'
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
    var graf7 = document.getElementById("grafico7");
    var myGraf7 = new Chart(graf7, {
      type: "doughnut",
      //type: "pie",
      data: {
        //labels: this.pieChartLabels,
        labels: this.ChartLabelsGrafico7,
        datasets: [{
          data: this.ChartDataGrafico7,
          //data: this.pieChartData,
          backgroundColor: [
            'rgba(0, 0, 0, 0.3)',
            'rgba(230, 0, 0, 0.4)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(133, 193, 233)',
            'rgba(82, 190, 128)',
            'rgba(46, 64, 83)',
            'rgba(244, 208, 63)',
            'rgba(253, 254, 254)',
            'rgba(136, 78, 160)',
            'rgba(245, 176, 65)',
            ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 2
        }]
      },
    });
  }
  ngOnInit() {
    this.llamaServicePromesa();
  }

}
