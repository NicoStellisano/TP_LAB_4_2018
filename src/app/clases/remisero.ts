import {Usuario} from './usuario';
import {Vehiculo} from './vehiculo';
export class Remisero extends Usuario {
    constructor(public legajo: number, 
    public usuario: string,
    public nombre:string,
    public contrasenia: string,
    public tipo: number,
    public foto: string,
    public fechaNacimiento: string, 
    public estado: number,
    public sexo: string,
    public vehiculo: Vehiculo
    ) { 
        super(legajo,usuario,nombre,contrasenia,tipo,foto,fechaNacimiento,estado,sexo);
        this.vehiculo = vehiculo;
    }

  
}
