<?php
class Usuario
{
	public $Usuario;
    public $legajo;
 	public $nombre;
    public $tipo;
    public $contrasenia;
    public $fechaDeNacimiento;
    public $foto;
    public $estado;
    public $sexo;

	public static function TraerTodoLosUsuarios()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios");
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }
    public static function TraerTodosLosRemiseros()
    {
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("SELECT U.legajo,U.nombre,U.usuario,U.tipo,U.sexo,U.foto,U.estado,U.fechaDeNacimiento,V.id,V.modelo,V.marca,V.patente,UV.estado as uvestado,V.foto as fotoVehiculo,V.estado as estadoVehiculo
            FROM usuarios as U
            LEFT JOIN usuariobyvehiculos AS UV ON UV.idremisero =  U.legajo
            LEFT JOIN vehiculos as V ON UV.idvehiculo = V.id
            WHERE U.tipo = 3");
            // $consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios 
            // INNER JOIN vehiculos
            // Where tipo=3");
			
            $consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
    }
    public static function TraerUnUsuario($usuario,$pass)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuarios
			Where usuario = :usuario AND contrasenia = :pass");
			$consulta->bindParam(':usuario',$usuario);
			$consulta->bindParam(':pass',$pass);
			$consulta->execute();			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");		
	}
    public static function Relacionar($usuario,$vehiculo,$update)
    {

        if($update=="15")
        {
            $valor ="Entro";
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuariobyvehiculos(id,idremisero,idvehiculo,estado) 
        values(null,:usuario,:vehiculo,0)");
        $consulta->bindParam(':usuario',$usuario);
        $consulta->bindParam(':vehiculo',$vehiculo);
        $consulta->execute();	

        
        }else{
            $valor ="update";
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE vehiculos V
            INNER JOIN usuariobyvehiculos AS UV ON UV.idremisero =:usuario 
            SET duenio = 0 
            WHERE V.id = UV.idvehiculo");
            $consulta->bindParam(':usuario',$usuario);
            $consulta->execute();	
                  
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuariobyvehiculos SET idvehiculo =:vehiculo WHERE idremisero =:usuario");
        $consulta->bindParam(':usuario',$usuario);
        $consulta->bindParam(':vehiculo',$vehiculo);
        $consulta->execute();	

       

        }
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE vehiculos SET duenio = 1 WHERE id =:vehiculo");
        $consulta->bindParam(':vehiculo',$vehiculo);
        $consulta->execute();	

        return $valor;
    }		
    public function InsertarUsuarioParametros()
    {
               $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
               $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuarios(legajo,nombre,usuario,sexo,contrasenia,tipo,fechadeNacimiento,foto,estado)
               values(null,:nombre,:usuario,:sexo,:contrasenia,:tipo,:fechaDeNacimiento,:foto,:estado)");
               $consulta->bindValue(':nombre',$this->nombre);
               $consulta->bindValue(':usuario',$this->Usuario);
               $consulta->bindValue(':tipo', $this->tipo);
               $consulta->bindValue(':fechaDeNacimiento',$this->fechaDeNacimiento);
               $consulta->bindValue(':foto',$this->foto);
               $consulta->bindValue(':contrasenia',$this->contrasenia);
               $consulta->bindValue(':sexo',$this->sexo);
               $consulta->bindValue(':estado',$this->estado);
               $consulta->execute();		
               return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
}
?>