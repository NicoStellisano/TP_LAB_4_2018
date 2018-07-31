export class Encuesta {
    constructor(public id: number,
    public pregunta1: string,
    public pregunta2: string,
    public pregunta3: string,
    public pregunta4: string,
    public pregunta5: string,
    public pregunta6: string,
    public pregunta7: string,
    public pregunta8: string,
    public idCliente: number){
        this.id = id;
        this.pregunta1 = pregunta1;
        this.pregunta2 = pregunta2;
        this.pregunta3 = pregunta3;
        this.pregunta4 = pregunta4;
        this.pregunta5 = pregunta5;
        this.pregunta6 = pregunta6;
        this.pregunta7 = pregunta7;
        this.pregunta8 = pregunta8;
        this.idCliente = idCliente;
    }
}
