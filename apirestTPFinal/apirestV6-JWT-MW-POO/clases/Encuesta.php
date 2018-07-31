<?php
class Encuesta
{
	public $id;
    public $idCliente;
 	public $pregunta1;
  	public $pregunta2;
    public $pregunta3;
    public $pregunta4;
    public $pregunta5;
    public $pregunta6;
    public $pregunta7;
    public $pregunta8;

    public static function TraerTodasLasEncuestas()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from encuestas");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");		
    }
    public function InsertarEncuestaParametros()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into encuestas (id,pregunta1,pregunta2,pregunta3,pregunta4,pregunta5,pregunta6,pregunta7,pregunta8,idCliente)
        values(null,:pregunta1,:pregunta2,:pregunta3,:pregunta4,:pregunta5,:pregunta6,:pregunta7,:pregunta8,'$this->idCliente')");
        $consulta->bindValue(':pregunta1',$this->pregunta1);
        $consulta->bindValue(':pregunta2',$this->pregunta2);
        $consulta->bindValue(':pregunta3',$this->pregunta3);
        $consulta->bindValue(':pregunta4',$this->pregunta4);
        $consulta->bindValue(':pregunta5',$this->pregunta5);
        $consulta->bindValue(':pregunta6',$this->pregunta6);
        $consulta->bindValue(':pregunta7',$this->pregunta7);
        $consulta->bindValue(':pregunta8',$this->pregunta8);
        $consulta->execute();		
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>