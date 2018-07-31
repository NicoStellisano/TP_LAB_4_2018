<?php
require_once 'Vehiculos.php';
class VehiculoApi extends Vehiculos 
{
    public function TraerTodos($request, $response, $args) {
        $todosLosVehiculos=Vehiculos::TraerTodosLosVehiculos();
        $newresponse = $response->withJson($todosLosVehiculos, 200);  
        return $newresponse;
    }
    public function traerRemis($request, $response, $args) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $ArrayDeParametros = $request->getParsedBody();    

        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT V.id, modelo, marca, patente, foto, V.estado, duenio,UV.idremisero AS idDueño FROM vehiculos AS V
        LEFT JOIN usuariobyvehiculos AS UV ON UV.idvehiculo = V.id");
        $consulta->execute();			
        $todosLosVehiculos = $consulta->fetchAll(PDO::FETCH_CLASS, "Vehiculos");		
        $newresponse = $response->withJson($todosLosVehiculos, 200);  
        return $newresponse;
    }
    
    public function CargarUno($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $marca = $ArrayDeParametros["marca"];
       $patente = $ArrayDeParametros["patente"];
       $modelo = $ArrayDeParametros['modelo'];
       $dueño = $ArrayDeParametros['dueño'];

       $destino="./assets/vehiculos/";
       $archivos = $request->getUploadedFiles();
       $nombreAnterior=$archivos['foto']->getClientFilename();
       $extension= explode(".", $nombreAnterior);
       $extension=array_reverse($extension);
       $nombre = $patente.'.'.$extension[0];
       $archivos['foto']->moveTo($destino.$nombre);

       $miVehiculo = new Vehiculos();
       $miVehiculo->marca=$marca;
       $miVehiculo->patente=$patente;
       $miVehiculo->modelo=$modelo;
       $miVehiculo->foto = $nombre;
       $miVehiculo->dueño = $dueño;
       
       $lastId = $miVehiculo->InsertarVehiculoParametros();
       $objDelaRespuesta->respuesta=$lastId;
       //$objDelaRespuesta->respuesta=$extension;
  
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function DeshabilitarVehiculo($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE vehiculos AS V SET estado=2 
        WHERE id = :id ");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuariobyvehiculos SET estado=1
        WHERE idvehiculo = :id ");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	

        $objDelaRespuesta->respuesta="Vehiculo desabilitado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
   public function HabilitarVehiculo($request, $response, $args)
   {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $id = $ArrayDeParametros["id"];
        
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE vehiculos SET estado=1 WHERE id = :id");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuariobyvehiculos SET estado=0
        WHERE idvehiculo = :id ");
        $consulta->bindParam(':id',$id);
        $consulta->execute();	
        
        $objDelaRespuesta->respuesta="Vehiculo reabilitado éxitosamente.";
        return $response->withJson($objDelaRespuesta, 200);
   }
   
}
?>