import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { VerificarService } from '../../servicios/verificar.service';
import { Usuario } from '../../clases/usuario';
import { Vehiculo } from '../../clases/vehiculo';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { FileSystemFileEntry, FileSystemEntryMetadata, FileSystemEntry, FileSystemDirectoryEntry } from '../../file-Drop/dom.types';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

function copiaClave(input: FormControl) {

  if (input.root.get('clave') == null) {
    return null;
  }

  const verificar = input.root.get('clave').value === input.value;
  return verificar ? null : { mismaClave: true };
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public miUsuario: Usuario;
  public miVehiculo: Vehiculo;
  miServicioUsuario: UsuariosService;
  miServicioVehiculo: VehiculosService;
  miServicioVerificacion: VerificarService
  claveCopia: string;
  tipo = "2";
  HasDrive: false;
  tipoUsuario = "Cliente";
  resolved: boolean = false;
  public files: UploadFile[] = [];
  public file: File;
  public nombreFoto1: string = "";
  public file2: File;
  public nombreFoto2: string = "";
  ngOnInit(){
  };
}
  // public gif = false;
  // gif2 = false;
  // repetidor: any;
  // resolvedCaptcha(result) {
  //   this.resolved = true;
  // }

  // marca = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);

  // modelo = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);

  // patente = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);


  // usuario = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);

  // nombre = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);

  // apellido = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);

  // sexo = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(1)
  // ]);

  // clave = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);

  // nacimiento = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5)
  // ]);

  // copiaClave = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(5),
  //   copiaClave
  // ]);

  // registroForm: FormGroup = this.builder.group({
  //   usuario: this.usuario,
  //   nombre: this.nombre,
  //   apellido: this.apellido,
  //   clave: this.clave,
  //   copiaClave: this.copiaClave,
  //   sexo: this.sexo,
  //   nacimiento: this.nacimiento
  // });
  // /*registroForm2: FormGroup = this.builder.group({
  //   usuario: this.usuario,
  //   nombre: this.nombre,
  //   apellido: this.apellido,
  //   clave: this.clave,
  //   copiaClave: this.copiaClave,
  //   sexo: this.sexo,
  //   nacimiento: this.nacimiento,
  //   patente: this.patente,
  //   marca: this.marca,
  //   modelo: this.modelo
  // });*/
  // ultimoUsuario: number = 0;
  // ultimoVehiculo: number = 0;

  // constructor(private router: Router, private builder: FormBuilder,private spinnerService: Ng4LoadingSpinnerService, ServicioUsuario: UsuariosService, ServicioVehiculo: VehiculosService, VerificarService: VerificarService) {
  //   this.miUsuario = new Usuario( null, null, null, null, null, null, null, null, null);
  //   this.miVehiculo = new Vehiculo(null, null, null, null, null, null,null);
  //   this.miServicioUsuario = ServicioUsuario;
  //   this.miServicioVehiculo = ServicioVehiculo;
  //   this.miServicioVerificacion = VerificarService;
  // }

  // ngOnInit() {
  //   this.spinnerService.show();
  //   setTimeout(() => {
  //     this.spinnerService.hide();
  
  //     }, 2500);
  // }
  // cambiarTipo() {
  //   if (this.tipo == "2")
  //     this.tipoUsuario = "Cliente";
  //   if (this.tipo == "3")
  //     this.tipoUsuario = "Remisero";
  //   this.resolved = false;
  // }
  // cambiarValidacion() {
  //   this.resolved = false;
  //   if (this.HasDrive) {
  //     this.registroForm = this.builder.group({
  //       usuario: this.usuario,
  //       nombre: this.nombre,
  //       apellido: this.apellido,
  //       clave: this.clave,
  //       copiaClave: this.copiaClave,
  //       sexo: this.sexo,
  //       nacimiento: this.nacimiento,
  //       patente: this.patente,
  //       marca: this.marca,
  //       modelo: this.modelo
  //     });
  //   }
  //   else {
  //     this.registroForm = this.builder.group({
  //       usuario: this.usuario,
  //       nombre: this.nombre,
  //       apellido: this.apellido,
  //       clave: this.clave,
  //       copiaClave: this.copiaClave,
  //       sexo: this.sexo,
  //       nacimiento: this.nacimiento
  //     });
  //   }
  // }
  // cancelar() {
  //   this.router.navigate(['/Login']);
  // }
  // Registrar() {
  //   this.gif2 = true;
  //   this.repetidor = setInterval(() => {
  //   if (this.tipo == "2") {
  //     this.miServicioUsuario.RegistrarCliente(this.miUsuario, this.file)
  //       .then((datos) => {
  //         if (datos == true) {
  //           this.registrarUsuario();
  //         }
  //       })
  //       .catch(
  //       (noSeEncontroUsuario) => { alert("Error en el sistema"); }
  //       );
  //   }
  //   if (this.tipo == "3") {
  //     if (this.HasDrive) {
  //       this.miServicioUsuario.RegistrarRemisero(this.miUsuario, this.file)
  //         .then((datos) => {
  //           this.ultimoUsuario = datos;
  //           this.miVehiculo.dueño = 1;
  //           this.miServicioVehiculo.RegistrarVehiculo(this.miVehiculo, this.file2).then(
  //             (datos) => {
  //               this.ultimoVehiculo = datos;
  //               this.miServicioUsuario.RegistrarRemiseroConVehiculo(this.ultimoUsuario, this.ultimoVehiculo).then(
  //                 (datos) => {
  //                   this.registrarUsuario();
  //                 }
  //               )
  //               .catch(
  //                 (noSeEncontroUsuario) => { alert("Error en el sistema"); }
  //               );
  //             }
  //           ).catch(
  //             (noSeEncontroVehiculo) => { alert("Error en el sistema"); }
  //             );
  //           this.registrarUsuario();
  //         })
  //         .catch(
  //         (noSeEncontroUsuario) => { alert("Error en el sistema"); }
  //         );
  //     }
  //     else {
  //       this.miServicioUsuario.RegistrarRemisero(this.miUsuario, this.file)
  //         .then((datos) => {
  //           this.registrarUsuario();
  //         })
  //         .catch(
  //         (noSeEncontroUsuario) => { alert("Error en el sistema"); }
  //         );
  //     }
  //   }
  //   }, 3000);
  // }
  // registrarUsuario() {
  //   this.miServicioUsuario.BuscarUsuario(this.miUsuario.usuario, this.miUsuario.contrasenia)
  //     .then((datos) => {
  //       if (datos != null) {
  //         datos;
  //         //localStorage.setItem("token",JSON.stringify(datos));
  //         //this.router.navigate(['/Principal']);
  //         this.crearToken(datos);
  //       }
  //     })
  //     .catch(
  //     (noSeEncontroUsuario) => { alert("Datos incorrectos"); }
  //     );
  // }

  // crearToken(datos: any) {
  //   this.miServicioVerificacion.crearToken(datos).then((datos) => {
  //     if (datos == true){
  //       this.gif2 = false;
  //       clearInterval(this.repetidor);
  //       this.router.navigate(['/Principal']);

  //     }
  //   })
  // }
  // public dropped(event: UploadEvent) {
  //   this.gif = true;
  //   this.files = event.files;
  //   if (this.files[0].fileEntry.isFile) {
  //     const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;

  //     fileEntry.file((file: File) => {
  //       this.nombreFoto1 = file.name;
  //       this.gif = false;
  //       this.file = file;
  //     });
  //   }
  //   else {
  //     alert("asadasdasd");
  //   }
  // }
  // public dropped2(event: UploadEvent) {
  //   this.gif = true;
  //   this.files = event.files;
  //   if (this.files[0].fileEntry.isFile) {
  //     const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;

  //     fileEntry.file((file: File) => {
  //       this.nombreFoto2 = file.name;
  //       this.gif = false;
  //       this.file2 = file;
  //     });
  //   }
  //   else {
  //     alert("asadasdasd");
  //   }
  // }

  // public fileOver(event) {
  //   console.log(event);
  // }

  // public fileLeave(event) {
  //   console.log(event);
  // }

