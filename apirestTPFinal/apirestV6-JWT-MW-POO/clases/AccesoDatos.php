<?php
class AccesoDatos
{
    private static $ObjetoAccesoDatos;
    private $objetoPDO;
 
    private function __construct()
    {
        try { 
            $this->objetoPDO = new PDO('mysql:host=localhost;dbname=id5878175_remiseria;charset=utf8', 'id5878175_remiseria', 'Nicolas00', array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            //$this->objetoPDO = new PDO('mysql:host=mysql.hostinger.com.ar;dbname=u165458543_final;charset=utf8', 'u165458543_rbal', 'Laboratorio4', array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            
            $this->objetoPDO->exec("SET CHARACTER SET utf8");
            } 
        catch (PDOException $e) { 
            print "Error!: " . $e->getMessage(); 
            die();
        }
    }
 
    public function RetornarConsulta($sql)
    { 
        return $this->objetoPDO->prepare($sql); 
    }
     public function RetornarUltimoIdInsertado()
    { 
        return $this->objetoPDO->lastInsertId(); 
    }
 
    public static function dameUnObjetoAcceso()
    { 
        if (!isset(self::$ObjetoAccesoDatos)) {          
            self::$ObjetoAccesoDatos = new AccesoDatos(); 
        } 
        return self::$ObjetoAccesoDatos;        
    }
 
 
     // Evita que el objeto se pueda clonar
    public function __clone()
    { 
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR); 
    }
}
?>