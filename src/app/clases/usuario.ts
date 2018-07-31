export class Usuario {
    
    constructor(public legajo: number, 
    public usuario: string,
    public nombre:string,
    public contrasenia: string,
    public tipo: number,
    public foto: string,
    public fechaNacimiento: string, 
    public estado: number,
    public sexo: string
    ) { 
        this.legajo = legajo;
        this.usuario = usuario;
        this.nombre = nombre;
        this.contrasenia = contrasenia;
        this.tipo = tipo;
        this.fechaNacimiento = fechaNacimiento;
        this.foto = foto;
        this.estado = estado;
        this.sexo = sexo;
    }
}