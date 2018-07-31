import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UsuariosService } from '../../servicios/usuarios.service';
import { VerificarService } from '../../servicios/verificar.service';
import { Usuario } from '../../clases/usuario';
import { Vehiculo } from '../../clases/vehiculo';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileSystemFileEntry, FileSystemEntryMetadata, FileSystemEntry, FileSystemDirectoryEntry } from '../../file-Drop/dom.types';

function copiaClave(input: FormControl) {

  if (input.root.get('clave') == null) {
    return null;
  }

  const verificar = input.root.get('clave').value === input.value;
  return verificar ? null : { mismaClave: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  
  miServicioUsuario: UsuariosService;
  miServicioVerificacion: VerificarService;
  lusuario = '';
  lclave = '';
  logeando = true;
  mensaje = "";

  gif = false;
  repetidor: any;
  public miUsuario = new Usuario(null, null, null, null, null, null, null, null, null);
  public miVehiculo = new Vehiculo(null, null, null, null, null, null,null);
  registroMiServicioUsuario: UsuariosService;
  miServicioVehiculo: VehiculosService;
  registroMiServicioVerificacion: VerificarService
  claveCopia: string;
  tipo = "2";
  HasDrive: false;
  public tipoUsuario:string;
  resolved: boolean = false;
  public files: UploadFile[] = [];
  public file: File;
  public nombreFoto1: string;
  public file2: File;
  public nombreFoto2: string;
  public hasFile:boolean;
  marca = new FormControl(this.miVehiculo.marca, [
    Validators.required,
    Validators.minLength(2)
  ]);

  modelo = new FormControl(this.miVehiculo.modelo, [
    Validators.required,
    Validators.minLength(2)
  ]);

  patente = new FormControl(this.miVehiculo.patente, [
    Validators.required,
    Validators.minLength(6)
  ]);


  usuario = new FormControl(this.miUsuario.usuario, [
    Validators.required,
    Validators.minLength(5)
  ]);

  nombre = new FormControl(this.miUsuario.nombre, [
    Validators.required,
    Validators.minLength(5)
  ]);

  sexo = new FormControl(this.miUsuario.sexo, [
    Validators.required,
    Validators.minLength(1)
  ]);

  clave = new FormControl(this.miUsuario.contrasenia, [
    Validators.required,
    Validators.minLength(5)
  ]);

  nacimiento = new FormControl(this.miUsuario.fechaNacimiento, [
    Validators.required,
    Validators.minLength(5)
  ]);

  copiaClave = new FormControl(this.claveCopia, [
    Validators.required,
    Validators.minLength(5),
    copiaClave
  ]);

  registroForm: FormGroup = this.builder.group({
    usuario: this.usuario,
    nombre: this.nombre,
    clave: this.clave,
    copiaClave: this.copiaClave,
    sexo: this.sexo,
    nacimiento: this.nacimiento
  });
  
  ultimoUsuario: number = 0;
  ultimoVehiculo: number = 0;



  constructor(private spinnerService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    ServicioUsuario: UsuariosService,
    ServicioVerificacion: VerificarService,
    ServicioVehiculo: VehiculosService,
    private builder: FormBuilder) {
    this.miServicioUsuario = ServicioUsuario;
    this.miServicioVerificacion = ServicioVerificacion;

    this.registroMiServicioUsuario = ServicioUsuario;
    this.miServicioVehiculo = ServicioVehiculo;
    this.registroMiServicioVerificacion = ServicioVerificacion;
    localStorage.clear();


  }

  debug()
{
  debugger;
}

  Entrar() {
    if(this.lusuario!="" && this.lclave!="")
    {

    
    this.spinnerService.show();
      this.miServicioUsuario.BuscarUsuario(this.lusuario, this.lclave)
      .then((datos) => {
        if (datos != null) {

          clearInterval(this.repetidor);
          if(datos.estado==2 || datos.estado==4 || datos.estado==0)
          this.crearToken(datos);
          else if(datos.estado==1)
          {
          swal({
            title: "Usted debe esperar a que le aprueben el ingreso",
            icon: "warning",
          });
          this.spinnerService.hide();
        }else{
          swal({
            title: "Usted tiene el acceso restringido, hable con el encargado",
            icon: "warning",
          });
          this.spinnerService.hide();
        }
      }
        else {
          swal({
            title: "Datos incorrectos",
            icon: "warning",
          });
          this.spinnerService.hide();
        }
      })
      .catch(
      (noSeEncontroUsuario) => { alert("Datos incorrectos"); }
      );
  }else{
    swal({
      title: "Complete los campos",
      icon: "warning",
    });
    this.spinnerService.hide();

  }
  }

  crearToken(datos: any) {
    this.miServicioVerificacion.crearToken(datos).then((data) => {
      if (data == true)
      {
        
      debugger;
      if(datos.tipo=="2")
      this.router.navigate(['/Viaje']);
      else
      this.router.navigate(['/Principal']);

      }
    })
  }
  Cargar(opcion: number) {
    if (opcion == 1) {
      this.lusuario = "Nicolas";
      this.lclave = "Rodrigo1234";
    }
    if (opcion == 2) {
      this.lusuario = "asd@asd.com";
      this.lclave = "asd123";
    }
    if (opcion == 3) {
      this.lusuario = "paulwalker@walker.com";
      this.lclave = "asd123";
    }
  }
  ngOnInit() {
    localStorage.removeItem('modificarViaje');
    this.nombreFoto1="";
    this.nombreFoto2="";
    this.tipoUsuario="Cliente";
    this.hasFile=false;
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
  
      }, 2500);
  }

  
 
  resolvedCaptcha(result) {
    this.resolved = true;
  }



  ///////////////////////////////


  cambiarTipo() {
    debugger;
    if (this.tipo == "2")
      this.tipoUsuario = "Cliente";
    if (this.tipo == "3")
      this.tipoUsuario = "Remisero";
    this.resolved = false;
  }
  cambiarValidacion() {
    debugger;
    if (this.HasDrive) {
      this.registroForm = this.builder.group({
        usuario: this.usuario,
        nombre: this.nombre,
        clave: this.clave,
        copiaClave: this.copiaClave,
        sexo: this.sexo,
        nacimiento: this.nacimiento,
        patente: this.patente,
        marca: this.marca,
        modelo: this.modelo
      });
    }
    else {
      this.registroForm = this.builder.group({
        usuario: this.usuario,
        nombre: this.nombre,
        clave: this.clave,
        copiaClave: this.copiaClave,
        sexo: this.sexo,
        nacimiento: this.nacimiento
      });
    }
  }
  cancelar() {
    this.router.navigate(['/Login']);
  }
  Registrar() {
    if(this.nombreFoto2=='' && this.HasDrive)
    {
      swal({
        title: "Suba una imagen del vehículo",
        icon: "warning",
      });
      return;     
    }
    if (this.tipoUsuario == "Cliente") {
      if(this.registroForm.valid)
      this.miServicioUsuario.RegistrarCliente(this.miUsuario, this.file)
        .then((datos) => {
          if (datos == true) {
            this.registrarUsuario();
          }
        })
        .catch(
        (noSeEncontroUsuario) => { alert("Error en el sistema"); }
        );
    }
    if (this.tipoUsuario == "Remisero") {
      if (this.HasDrive) {
        this.miServicioUsuario.RegistrarRemisero(this.miUsuario, this.file)
          .then((datos) => {
            this.ultimoUsuario = datos;
            this.miVehiculo.dueño = 1;
            this.miServicioVehiculo.RegistrarVehiculo(this.miVehiculo, this.file2).then(
              (datos) => {
                this.ultimoVehiculo = datos;
                this.miServicioUsuario.RegistrarRemiseroConVehiculo(this.ultimoUsuario, this.ultimoVehiculo,"15").then(
                  (datos) => {
                    this.registrarUsuario();
                  }
                )
                .catch(
                  (noSeEncontroUsuario) => { alert("Error en el sistema"); }
                );
              }
            ).catch(
              (noSeEncontroVehiculo) => { alert("Error en el sistema"); }
              );
            this.registrarUsuario();
          })
          .catch(
          (noSeEncontroUsuario) => { alert("Error en el sistema"); }
          );
      }
      else {
        this.miServicioUsuario.RegistrarRemisero(this.miUsuario, this.file)
          .then((datos) => {
            this.registrarUsuario();
          })
          .catch(
          (noSeEncontroUsuario) => { alert("Error en el sistema"); }
          );
      }
    }
  }
  registrarUsuario() {

    swal({
      title: "Registrado! Ahora espere a que lo apruebe el encargado",
      icon: "success",
    });         
    this.router.navigate(['']);
   
  }

  crearTokenR(datos: any) {
    this.registroMiServicioVerificacion.crearToken(datos).then((datos) => {
      if (datos == true){
        clearInterval(this.repetidor);
        this.router.navigate(['/Principal']);

      }
    })
  }
  public dropped(event: UploadEvent) {
    debugger;
    this.gif = true;
    this.files = event.files;
    if (this.files[0].fileEntry.isFile) {
      const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;

      fileEntry.file((file: File) => {
        this.nombreFoto1 = file.name;
        this.gif = false;
        this.file = file;
      });
    }
    else {
      alert("asadasdasd");
    }
  }
  public dropped2(event: UploadEvent) {
    this.gif = true;
    this.files = event.files;
    if (this.files[0].fileEntry.isFile) {
      const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;

      fileEntry.file((file: File) => {
        this.nombreFoto2 = file.name;
        this.gif = false;
        this.file2 = file;
      });
    }
    else {
      alert("asadasdasd");
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
  
}


