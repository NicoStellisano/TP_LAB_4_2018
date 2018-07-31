import {Vehiculo} from './vehiculo';
import {Remisero} from './remisero';
export class Horario {
    constructor(public id: number,
    public remisero: Remisero,
    public vehiculo: Vehiculo,
    public timeDesde: string,
    public timeHasta: string,
    public estado: number){
        this.id = id;
        this.remisero = remisero;
        this.vehiculo = vehiculo;
        this.timeDesde = timeDesde;
        this.timeHasta = timeHasta;
        this.estado = estado;
    }
}
