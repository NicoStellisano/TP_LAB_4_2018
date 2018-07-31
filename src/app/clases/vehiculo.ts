export class Vehiculo {
    constructor(public id: number, 
    public marca: string,
    public modelo:string,
    public patente: string,
    public foto: string,
    public estado: number ,  
    public dueño: number   ,
    public idDuenio?:number  
    ) { 
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.patente = patente;
        this.foto = foto;
        this.estado = estado;
        this.dueño = dueño;
        this.idDuenio = idDuenio;
    }
}
