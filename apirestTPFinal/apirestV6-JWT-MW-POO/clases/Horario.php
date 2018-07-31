<?php
class Horario
{
	public $id;
    public $remisero;
 	public $vehiculo;
  	public $fechaDesde;
    public $fechaHasta;
    public $estado;

    public static function Buscar($legajo)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT U.legajo,U.nombre,U.usuario,U.tipo,U.sexo,U.foto,U.estado,U.fechaDeNacimiento,V.id,V.modelo,V.marca,V.patente,V.foto as fotoVehiculo,V.estado as estadoVehiculo
            FROM usuarios as U
            LEFT JOIN usuariobyvehiculos AS UV ON UV.idremisero =  U.legajo
            LEFT JOIN vehiculos as V ON UV.idvehiculo = V.id
			Where legajo = :legajo AND tipo = 3");
			$consulta->bindParam(':legajo',$legajo);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
	}
	public static function BuscarHora($legajo)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM horarios
            Where idremisero = :legajo");
			$consulta->bindParam(':legajo',$legajo);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Horario");		
	}
}
?>