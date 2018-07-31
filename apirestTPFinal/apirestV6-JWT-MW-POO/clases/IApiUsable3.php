<?php 

interface IApiUsable3{ 
	
	//public function TraerUno($request, $response, $args); 
   	public function TraerTodos($request, $response, $args); 
   	public function CargarUno($request, $response, $args);
	public function BorrarUno($request, $response, $args);
	public function CargarFoto($request, $response, $args);
	public function CrearToken($request, $response, $args);
	public function VerificarToken($request, $response, $args);
	public function RecuperarToken($request, $response, $args);
   	//public function ModificarUno($request, $response, $args);
}