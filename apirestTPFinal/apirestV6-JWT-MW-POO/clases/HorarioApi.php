<?php
require_once 'Horario.php';
class HorarioApi extends Horario {

    
    public function BuscarRemisero($request, $response, $args) 
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $legajo= $ArrayDeParametros["legajo"];
       $Horario = HorarioApi::Buscar($legajo);
       $newresponse = $response->withJson($Horario, 200);  
       return $newresponse;
    }
    public function BuscarHorario($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       $legajo= $ArrayDeParametros["legajo"];
       $Horario = HorarioApi::BuscarHora($legajo);
       $newresponse = $response->withJson($Horario, 200);  
       return $newresponse;
    }
    public function BuscarHorarioViaje($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
        $ArrayDeParametros = $request->getParsedBody();
        $horario= $ArrayDeParametros["horario"];
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM horarios
        INNER JOIN usuarios ON usuarios.legajo = horarios.idremisero
        INNER JOIN usuariobyvehiculos as UVH ON UVH.idremisero = horarios.idremisero 
        WHERE horarios.horaDesde <= '$horario' AND horarios.horaHasta >= '$horario' AND horarios.estado = 1");
        $consulta->execute();			
        $valor = $consulta->fetchAll(PDO::FETCH_CLASS, "Horario");

        $newresponse = $response->withJson($valor, 200);  
        return $newresponse;
    }
    public function VerificarHorario($request, $response, $args) 
    {
        $objDelaRespuesta= new stdclass();
       
        $ArrayDeParametros = $request->getParsedBody();
        $desde= $ArrayDeParametros["desde"];
        $hasta= $ArrayDeParametros["hasta"];
        $remisero= $ArrayDeParametros["remisero"];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT count(id)as cant FROM horarios
        WHERE idremisero == :remisero  AND ((horaDesde <= '$desde' AND horaHasta > '$desde') OR(horaDesde < '$hasta' AND horaHasta >= '$hasta')
        OR(horaDesde >= '$desde' AND horaHasta <= '$hasta'))");
        //
        //$consulta->bindValue(':desde',$desde);
        //$consulta->bindValue(':hasta',$hasta);
        $consulta->bindValue(':remisero', $remisero);
        
        $consulta->execute();			
        $valor = $consulta->fetchAll(PDO::FETCH_CLASS, "Usuario");
        $newresponse = $response->withJson($valor, 200);  
        return $newresponse;
    }
    public function GuardarHorario($request, $response, $args)
    {
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $id = $ArrayDeParametros["id"];
       $remisero = $ArrayDeParametros["remisero"];
       $fechaDesde = $ArrayDeParametros['timeDesde'];
       $fechaHasta = $ArrayDeParametros['timeHasta'];
       
       if($id == "")
       {
        $id = null;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into horarios(id,idremisero,horaDesde,horaHasta,estado)
        values(:id,:remisero,:timeDesde,:timeHasta,1)");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':remisero',$remisero);
        $consulta->bindValue(':timeDesde', $fechaDesde);
        $consulta->bindValue(':timeHasta', $fechaHasta);
        $consulta->execute();		
        $lastId = $objetoAccesoDato->RetornarUltimoIdInsertado();
       }
       else{
        $lastId = $id;
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE horarios 
        SET horaDesde=:timeDesde,horaHasta=:timeHasta WHERE id = :id");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':timeDesde', $fechaDesde);
        $consulta->bindValue(':timeHasta', $fechaHasta);
        $consulta->execute();	
       }
       $objDelaRespuesta->respuesta=$lastId;
       //$objDelaRespuesta->respuesta=$id;
       return $response->withJson($objDelaRespuesta, 200);
    }
}
?>