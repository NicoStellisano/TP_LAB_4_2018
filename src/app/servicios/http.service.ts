import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

 //URl = "http://localhost:8080/apirestTPFinal/apirestV6-JWT-MW-POO/remiseria/";
 URl = "https://apistellisano.000webhostapp.com/apirestTPFinal/apirestV6-JWT-MW-POO/remiseria/";
  constructor(public http: HttpClient) { }
  public httpGetP ( direccion: string)
  { 
    return this.http
    .get( "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA3KKoeuXANsYY9u67GSzA6IxJEJG7OFjg&address="+direccion)
    .toPromise()
    .then( this.extractData )
    .catch( this.manejadorError );
  }
  public httpGetRuta(direccionDesde,direccionHasta)
  {   
    const formData = new FormData()
    formData.append('ruta',"https://maps.googleapis.com/maps/api/directions/json?origin="+direccionDesde+"&destination="+direccionHasta);
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    //return this.http.get("https://maps.googleapis.com/maps/api/directions/json?origin=Toledo&destination=Madrid&region=es&key=AIzaSyA3KKoeuXANsYY9u67GSzA6IxJEJG7OFjg")
    return this.http
    .post(this.URl+"ruta",formData,{headers})
    .toPromise()
    .then( this.extractData )
    .catch( this.manejadorError );
  }
  private extractData ( res: any ):any
  { 
    var obj = {
        origin:{
          lat: res.routes[0].legs[0].start_location.lat,
          lng: res.routes[0].legs[0].start_location.lng
        },
        destination:
        {
          lat: res.routes[0].legs[0].end_location.lat,
          lng: res.routes[0].legs[0].end_location.lng
        },
        duration:{
          value: res.routes[0].legs[0].duration.value/60
        },
        distance:{
          value: res.routes[0].legs[0].distance.value
        }
    };
    return obj;
  }
  extraerDatos(respuesta) {
    return respuesta || { };
  }
  manejadorError(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }
  dameTodasLasPromesas(url:string){
      return this.http.get(this.URl+url).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  crearToken(url:string,datos:any)
  { 
    const formData = new FormData()
    formData.append('usuario',datos.usuario);
    formData.append('nombre',datos.nombre);
    formData.append('tipo',datos.tipo);
    formData.append('fechaNacimiento',datos.fechaNacimiento);
    formData.append('legajo',datos.legajo)
    formData.append('habilitado',datos.estado);
    formData.append('foto',datos.foto);

    //var param = {usuario:datos.nombre,clave:datos.contrasenia};
    //var paramString = JSON.stringify(param);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  verificarToken(token:any,url:string)
  { 
    const formData = new FormData()
    formData.append('Token',token);
    
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  recuperarToken(token:any)
  {
    const formData = new FormData()
    formData.append('Token',token);
    
    var url = "RecuperarToken";
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  //USUARIOS
  buscarRemisero(url:string,legajo:string)
  { 
    const formData = new FormData()
    formData.append('legajo',legajo);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarUsuario(url:string,usuario:string,clave:string)
  { 
    const formData = new FormData()
    formData.append('usuario',usuario);
    formData.append('contrasenia',clave);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  entregarUsuario(user:any,file:any)
  {
    //var param = {usuario:player.usuario,nombre:player.nombre,apellido:player.apellido,contrasenia:player.contrasenia,email:player.email};
    //var paramString = JSON.stringify(param);
    const formData = new FormData()
    formData.append('usuario',user.usuario);
    formData.append('nombre',user.nombre);
    formData.append('sexo',user.sexo);
    formData.append('contrasenia',user.contrasenia);
    formData.append('tipo',user.tipo);
    formData.append('estado',user.estado);
    formData.append('foto',file);
    formData.append('fechaDeNacimiento',user.fechaNacimiento);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  entregarUsuarioVehiculo(usuarioId:any,vehiculoId:any,update:any,url:string)
  { 
    const formData = new FormData()
    formData.append('usuario',usuarioId);
    formData.append('vehiculo',vehiculoId);
    formData.append('update',update);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  habilitarEmpleado(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('legajo',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  desabilitarEmpleado(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('legajo',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  ContratarEmpleado(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('legajo',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  contestoEncuesta(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('legajo',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  //VEHICULOS
  entregarVehiculo(vehiculo:any,file:any,url:string)
  { 
    const formData = new FormData()
    formData.append('marca',vehiculo.marca);
    formData.append('patente',vehiculo.patente);
    formData.append('modelo',vehiculo.modelo);
    formData.append('dueño',vehiculo.dueño)
    formData.append('foto',file);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  habilitarVehiculo(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('id',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  desabilitarVehiculo(url:string,legajo:string)
  {
    const formData = new FormData()
    formData.append('id',legajo);
    let header = new HttpHeaders()
    header.append('Content-Type', 'application/json');
    return this.http.post(this.URl+url, formData,{headers: header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }

  //HORARIOS
  buscarHorario(url:string,legajo:string)
  { 
    const formData = new FormData()
    formData.append('legajo',legajo);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  buscarHorarioViaje(url:string,horario:string)
  { 
    const formData = new FormData()
    formData.append('horario',horario);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  entregarHorario(horario:any,url:string)
  { 
    const formData = new FormData()
    formData.append('id',horario.id == null ? "":horario.id);
    formData.append('remisero',horario.remisero.legajo);
    formData.append('timeDesde',horario.timeDesde);
    formData.append('timeHasta',horario.timeHasta);
 
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  VerificarHorario(url:string,legajo:any,desde:any,hasta:any)
  {
    const formData = new FormData()
    formData.append('desde',desde);
    formData.append('hasta',hasta);
    formData.append('remisero',legajo);
    //var param = {usuario:usuario,contrasenia:clave};
    //var paramString = JSON.stringify(param);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  //ENCUESTA
  entregarEncuesta(encuesta:any,url:string)
  { 
    const formData = new FormData()
    formData.append('pregunta1',encuesta.pregunta1);
    formData.append('pregunta2',encuesta.pregunta2);
    formData.append('pregunta3',encuesta.pregunta3);
    formData.append('pregunta4',encuesta.pregunta4);
    formData.append('pregunta5',encuesta.pregunta5);
    formData.append('pregunta6',encuesta.pregunta6);
    formData.append('pregunta7',encuesta.pregunta7);
    formData.append('pregunta8',encuesta.pregunta8);
    formData.append('idCliente',encuesta.idCliente);

    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  //VIAJES
  entregarViaje(url:string,viaje: any)
  { 
    const formData = new FormData()
    formData.append('latDesde',viaje.latDesde);
    formData.append('lngDesde',viaje.lngDesde);
    formData.append('latHasta',viaje.latHasta);
    formData.append('lngHasta',viaje.lngHasta);
    formData.append('cliente',viaje.legajoCliente);
    formData.append('comodidad',viaje.comodidad);
    formData.append('medioPago',viaje.medioDePago);
    formData.append('duracion',viaje.duracion);
    formData.append('distancia',viaje.distancia);
    formData.append('precio',viaje.precio);
    formData.append('cantidad',viaje.cantidad)
    formData.append('horario',viaje.horario);
    formData.append('FotoCliente',viaje.FotoCliente);


    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  actualizarViaje(url:string,viaje: any)
  { 
    const formData = new FormData()
    formData.append('id',viaje.id);
    formData.append('estado',viaje.estado);
    formData.append('latDesde',viaje.latDesde);
    formData.append('lngDesde',viaje.lngDesde);
    formData.append('latHasta',viaje.latHasta);
    formData.append('lngHasta',viaje.lngHasta);
    formData.append('comodidad',viaje.comodidad);
    formData.append('medioPago',viaje.medioDePago);
    formData.append('duracion',viaje.duracion);
    formData.append('distancia',viaje.distancia);
    formData.append('precio',viaje.precio);
    formData.append('cantidad',viaje.cantidad)
    formData.append('horario',viaje.horario);
    formData.append('FotoCliente',viaje.FotoCliente);
    formData.append('legajoRemisero',viaje.remisero.legajoRemisero);
    formData.append('idVehiculo',viaje.vehiculo.id);


    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  actualizarViaje2(url:string,viaje: any)
  {   
    const formData = new FormData()
    formData.append('id',viaje.id);
    formData.append('estado',viaje.estado);
    formData.append('remisero',viaje.remisero.legajoRemisero)
    formData.append('vehiculo',viaje.vehiculo.id);
    formData.append('comodidad',viaje.comodidad);
    formData.append('medioDePago',viaje.medioDePago);


    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  dameTodasLasPromesasClienteViajes(url:string,legajo:any)
  {
    const formData = new FormData();
    formData.append('cliente',legajo);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  dameTodasLasPromesasRemiseroViajes(url:string,legajo:any)
  {
    const formData = new FormData();
    formData.append('remisero',legajo);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  dameTodasLasPromesasViajes(url:string)
  {
    const formData = new FormData();
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
  traerDatos(url:string,mes,anio){
    const formData = new FormData();
    formData.append('mes',mes);
    formData.append('anio',anio);
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    //return this.http.post(url,paramString).toPromise().then(this.extractData).catch(this.handleError);
    return this.http.post(this.URl+url,formData,{headers:header}).toPromise().then(this.extraerDatos).catch(this.manejadorError);
  }
}
