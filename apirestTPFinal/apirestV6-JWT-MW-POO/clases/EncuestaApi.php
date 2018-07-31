<?php
require_once 'Encuesta.php';
class EncuestaApi extends Encuesta {

    public function guardarEncuesta($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $idCliente = $ArrayDeParametros["idCliente"];
       $pregunta1 = $ArrayDeParametros["pregunta1"];
       $pregunta2 = $ArrayDeParametros["pregunta2"];
       $pregunta3 = $ArrayDeParametros["pregunta3"];
       $pregunta4 = $ArrayDeParametros["pregunta4"];
       $pregunta5 = $ArrayDeParametros["pregunta5"];
       $pregunta6 = $ArrayDeParametros["pregunta6"];
       $pregunta7 = $ArrayDeParametros["pregunta7"];
       $pregunta8 = $ArrayDeParametros["pregunta8"];

       $miEncuesta = new Encuesta();
       $miEncuesta->idCliente=$idCliente;
       $miEncuesta->pregunta1=$pregunta1;
       $miEncuesta->pregunta2=$pregunta2;
       $miEncuesta->pregunta3=$pregunta3;
       $miEncuesta->pregunta4=$pregunta4;
       $miEncuesta->pregunta5=$pregunta5;
       $miEncuesta->pregunta6=$pregunta6;
       $miEncuesta->pregunta7=$pregunta7;
       $miEncuesta->pregunta8=$pregunta8;
       
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT COUNT(*) AS cant FROM encuestas
        WHERE idCliente = '$miEncuesta->idCliente'");
        $consulta->execute();		
        $cant = $consulta->fetchAll(PDO::FETCH_CLASS, "Encuesta");
        $ultimoId = $cant[0]->cant;
        if($ultimoId == 0)
            $ultimoId =  $miEncuesta->InsertarEncuestaParametros();
        else
            $ultimoId = -1;

       $objDelaRespuesta->respuesta=$ultimoId;
       //$objDelaRespuesta->respuesta=$miUsuario;
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function traerEncuestas($request, $response, $args){
       $todasLasEncuestas=Encuesta::TraerTodasLasEncuestas();
       $newresponse = $response->withJson($todasLasEncuestas, 200);  
       return $newresponse;
   }
}
?>