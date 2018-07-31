<?php
class Vehiculos
{
	public $id;
    public $marca;
 	public $patente;
  	public $modelo;
    public $foto;
    public $estado;
    public $dueño;
    
    public static function TraerTodosLosVehiculos()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from vehiculos");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Vehiculos");		
    }
    public function InsertarVehiculoParametros()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into vehiculos(id, modelo,marca,patente,foto,estado,duenio)
        values(null,:modelo,:marca,:patente,:foto,1,:duenio)");
        $consulta->bindValue(':modelo',$this->modelo);
        $consulta->bindValue(':marca',$this->marca);
        $consulta->bindValue(':patente',$this->patente);
        $consulta->bindValue(':foto', $this->foto);
        $consulta->bindValue(':duenio', $this->dueño);
        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>