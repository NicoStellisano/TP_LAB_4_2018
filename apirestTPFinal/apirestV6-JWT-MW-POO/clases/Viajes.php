<?php
class Viajes
{
    public $id;
    public $latDesde;
 	public $lngDesde;
  	public $latHasta;
    public $lngHasta;
    public $vehiculo;
    public $remisero;
    public $cliente;
    public $estado;
    public $comodidad;
    public $mediopago;
    public $duracion;
    public $distancia;
    public $precio;
    public $cantidad;
    public $horario;
    public $FotoCliente;
    public $FotoRemisero;
    public $FotoVehiculo;



    public function InsertarViajeParametros(){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into viajes(id,legajoCliente,latDesde,latHasta,lngDesde,lngHasta,duracion,
         distancia,cantidadPasajeros,comodidad,precio,medioDePago,legajoRemisero,idVehiculo,estado,horario,FotoCliente)
        values(null,:legajoCliente,:latDesde,:latHasta,:lngDesde,:lngHasta,:duracion,
         :distancia,:cantidadPasajeros,:comodidad,:precio,:medioDePago,0,0,1,:horario,:FotoCliente)");
        $consulta->bindValue(':legajoCliente',$this->cliente);
        $consulta->bindValue(':latDesde',$this->latDesde);
        $consulta->bindValue(':latHasta',$this->latHasta);
        $consulta->bindValue(':lngDesde', $this->lngDesde);
        $consulta->bindValue(':lngHasta',$this->lngHasta);
        $consulta->bindValue(':duracion',$this->duracion);
        $consulta->bindValue(':distancia',$this->distancia);
        $consulta->bindValue(':cantidadPasajeros',$this->cantidad);
        $consulta->bindValue(':comodidad',$this->comodidad);
        $consulta->bindValue(':precio',$this->precio);
        $consulta->bindValue(':medioDePago',$this->medioPago);
        $consulta->bindValue(':horario',$this->horario);
        $consulta->bindValue(':FotoCliente',$this->FotoCliente);

        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
    public static function todosLosViajesCliente($legajo)
    {       
        
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            // WHERE legajoCliente = '$legajo'");
            // WHERE legajoCliente = '$legajo'");
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT V.id as id,V.latDesde,V.lngDesde,V.latHasta,V.lngHasta,V.estado,V.duracion,V.distancia,V.precio,V.horario,V.cantidadPasajeros,V.medioDePago,
            V.comodidad,V.legajoCliente,V.legajoRemisero,V.idVehiculo,U.foto as FotoRemisero,V.FotoCliente,VH.foto as FotoVehiculo
            FROM viajes as V
            LEFT JOIN usuarios as U ON U.legajo = V.legajoRemisero
            LEFT JOIN usuarios as C ON C.legajo = V.legajoCliente
            LEFT JOIN usuariobyvehiculos as UVH ON UVH.idremisero = V.legajoRemisero 
            LEFT JOIN vehiculos as VH ON VH.id = UVH.idvehiculo
            WHERE legajoCliente = '$legajo'
            ORDER BY V.estado");
			// $consulta =$objetoAccesoDato->RetornarConsulta("SELECT *
            // FROM viajes as V
            // WHERE legajoCliente = '$legajo'");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    public static function todosLosViajesRemisero($legajo)
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("SELECT V.id as id,V.latDesde,V.lngDesde,V.latHasta,V.lngHasta,V.estado,V.duracion,V.distancia,V.precio,V.horario,V.cantidadPasajeros,V.medioDePago,
            V.comodidad,V.legajoCliente,V.legajoRemisero,V.idVehiculo,U.foto as FotoRemisero,V.FotoCliente,VH.foto as FotoVehiculo
            FROM viajes as V
            LEFT JOIN usuarios as U ON U.legajo = V.legajoRemisero
            LEFT JOIN usuarios as C ON C.legajo = V.legajoCliente
            LEFT JOIN usuariobyvehiculos as UVH ON UVH.idremisero = V.legajoRemisero 
            LEFT JOIN vehiculos as VH ON VH.id = UVH.idvehiculo
            WHERE legajoRemisero = '$legajo'
            ORDER BY V.estado");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    public static function todosLosViajes()
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT V.id as id,V.latDesde,V.lngDesde,V.latHasta,V.lngHasta,V.estado,V.duracion,V.distancia,V.precio,V.horario,V.cantidadPasajeros,V.medioDePago,
            V.comodidad,V.legajoCliente,V.legajoRemisero,V.idVehiculo,U.foto as FotoRemisero,V.FotoCliente,VH.foto as FotoVehiculo
            FROM viajes as V
            LEFT JOIN usuarios as U ON U.legajo = V.legajoRemisero
            LEFT JOIN usuarios as C ON C.legajo = V.legajoCliente
            LEFT JOIN usuariobyvehiculos as UVH ON UVH.idremisero = V.legajoRemisero 
            LEFT JOIN vehiculos as VH ON VH.id = UVH.idvehiculo
            ORDER BY V.estado");
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Viajes");		
    }
    
}
?>