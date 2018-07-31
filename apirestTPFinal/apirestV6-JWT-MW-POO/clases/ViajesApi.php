<?php
require_once 'Viajes.php';
class ViajesApi extends Viajes
{
    public function TraerViajesCliente($request, $response, $args) {
        $ArrayDeParametros = $request->getParsedBody();
        $cliente = $ArrayDeParametros['cliente'];
        $todosLosViajes=Viajes::todosLosViajesCliente($cliente);
        $newresponse = $response->withJson($todosLosViajes, 200);  
        return $newresponse;
    }
    public function TraerViajesRemisero($request, $response, $args) {
        $ArrayDeParametros = $request->getParsedBody();
        $remisero = $ArrayDeParametros['remisero'];
        $todosLosViajes=Viajes::todosLosViajesRemisero($remisero);
        $newresponse = $response->withJson($todosLosViajes, 200);  
        return $newresponse;
    }
    public function TraerViajes($request, $response, $args) {
        $todosLosViajes=Viajes::todosLosViajes();
        $newresponse = $response->withJson($todosLosViajes, 200);  
        return $newresponse;
    }
    public function CargarViaje($request, $response, $args) {
       
       $objDelaRespuesta= new stdclass();
       
       $ArrayDeParametros = $request->getParsedBody();
       
       $latDesde = $ArrayDeParametros["latDesde"];
       $lngDesde = $ArrayDeParametros['lngDesde'];
       $latHasta = $ArrayDeParametros['latHasta'];
       $lngHasta = $ArrayDeParametros['lngHasta'];
       $cliente = $ArrayDeParametros['cliente'];
       $comodidad = $ArrayDeParametros['comodidad'];
       $medioPago = $ArrayDeParametros['medioPago'];
       $duracion = $ArrayDeParametros['duracion'];
       $distancia = $ArrayDeParametros['distancia'];
       $precio = $ArrayDeParametros['precio'];
       $cantidad = $ArrayDeParametros['cantidad'];
       $horario = $ArrayDeParametros['horario'];
       $FotoCliente = $ArrayDeParametros['FotoCliente'];


       $miViaje = new Viajes();
       $miViaje->latDesde=$latDesde;
       $miViaje->lngDesde=$lngDesde;
       $miViaje->latHasta=$latHasta;
       $miViaje->lngHasta=$lngHasta;
       $miViaje->cliente=$cliente;
       $miViaje->comodidad = $comodidad;
       $miViaje->medioPago=$medioPago;
       $miViaje->duracion = $duracion;
       $miViaje->distancia = $distancia;
       $miViaje->precio = $precio;
       $miViaje->cantidad = $cantidad;
       $miViaje->horario = $horario;
       $miViaje->FotoCliente = $FotoCliente;

       
       $lastId =  $miViaje->InsertarViajeParametros();

       $objDelaRespuesta->respuesta=$lastId;
       //$objDelaRespuesta->respuesta=$miUsuario;
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function ActualizarViaje($request, $response, $args) {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $id = $ArrayDeParametros["id"];
        $latDesde = $ArrayDeParametros["latDesde"];
        $lngDesde = $ArrayDeParametros['lngDesde'];
        $latHasta = $ArrayDeParametros['latHasta'];
        $lngHasta = $ArrayDeParametros['lngHasta'];
        $comodidad = $ArrayDeParametros['comodidad'];
        $medioPago = $ArrayDeParametros['medioPago'];
        $duracion = $ArrayDeParametros['duracion'];
        $distancia = $ArrayDeParametros['distancia'];
        $precio = $ArrayDeParametros['precio'];
        $cantidad = $ArrayDeParametros['cantidad'];
        $horario = $ArrayDeParametros['horario'];
        $estado = $ArrayDeParametros['estado'];
        $legajoRemisero = $ArrayDeParametros['legajoRemisero'];
        $idVehiculo = $ArrayDeParametros['idVehiculo'];
        $FotoCliente = $ArrayDeParametros['FotoCliente'];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE viajes 
        SET latDesde=:latDesde,
            lngDesde=:lngDesde,
            latHasta=:latHasta,
            lngHasta=:lngHasta,
            comodidad=:comodidad,
            medioDePago=:medioPago,
            duracion=:duracion,
            distancia=:distancia,
            precio=:precio,
            cantidadPasajeros=:cantidad,
            horario=:horario,
            estado=:estado,
            legajoRemisero=:legajoRemisero,
            idVehiculo=:idVehiculo,
            FotoCliente=:FotoCliente
            WHERE id = :id");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':latDesde',$latDesde);
        $consulta->bindValue(':lngDesde', $lngDesde);
        $consulta->bindValue(':latHasta', $latHasta);
        $consulta->bindValue(':lngHasta',$lngHasta);
        $consulta->bindValue(':comodidad', $comodidad);
        $consulta->bindValue(':medioPago', $medioPago);
        $consulta->bindValue(':duracion',$duracion);
        $consulta->bindValue(':distancia', $distancia);
        $consulta->bindValue(':precio', $precio);
        $consulta->bindValue(':cantidad',$cantidad);
        $consulta->bindValue(':horario',date ("Y-m-d H:i:s", strtotime($horario)));
        $consulta->bindValue(':estado', $estado);
        $consulta->bindValue(':legajoRemisero', $legajoRemisero);
        $consulta->bindValue(':idVehiculo', $idVehiculo);
        $consulta->bindValue(':FotoCliente', $FotoCliente);

        $consulta->execute();	

        $objDelaRespuesta->respuesta=$horario;
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function ActualizarViaje2($request, $response, $args) {
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        
        $id = $ArrayDeParametros["id"];
        $remisero = $ArrayDeParametros["remisero"];
        $vehiculo = $ArrayDeParametros['vehiculo'];
        $estado = $ArrayDeParametros['estado'];
        $comodidad = $ArrayDeParametros['comodidad'];
        $medioPago = $ArrayDeParametros['medioDePago'];


        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE viajes 
        SET legajoRemisero='$remisero',
            idVehiculo='$vehiculo',
            comodidad='$comodidad',
            medioDePago='$medioPago',
            estado=:estado
            WHERE id = :id");
        $consulta->bindValue(':id',$id);
        $consulta->bindValue(':estado', $estado);
        $consulta->execute();	

        $objDelaRespuesta->respuesta="viaje asignado correctamente";
       return $response->withJson($objDelaRespuesta, 200);
   }
   public function TraerDatos($request, $response, $args){
        $objDelaRespuesta= new stdclass();
        
        $ArrayDeParametros = $request->getParsedBody();
        $mes = $ArrayDeParametros["mes"];
        $mesHasta = (intval($mes)+1);
        $anio = $ArrayDeParametros["anio"];

        $desde = $anio.'-'.$mes.'-01';
        $hasta = $anio.'-'.$mesHasta.'-01';

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT C.nombre as Cliente,R.nombre as Remisero,R.legajo as LegajoRemisero,
        CONCAT(VH.marca,' ', VH.modelo) as Vehiculo,VH.patente as Patente
        ,V.duracion as Duracion,V.distancia as Distancia,V.comodidad as Comodidad,V.precio as Precio ,V.cantidadPasajeros as Pasajeros,
         V.medioDePago as MedioPago,V.estado as Estado, V.horario as Horario
        FROM viajes as V 
        LEFT JOIN usuarios as C ON  C.legajo = V.legajoCliente
        LEFT JOIN usuarios as R ON  R.legajo = V.legajoRemisero
        LEFT JOIN vehiculos as VH ON  VH.id = V.idVehiculo 
        WHERE V.horario >= '$desde' AND V.horario < '$hasta' AND V.estado=4 
        ORDER BY V.horario");
        $consulta->execute();	

        $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
        $objDelaRespuesta->respuesta= $datos;
       return $response->withJson($objDelaRespuesta, 200);
   }
}
?>