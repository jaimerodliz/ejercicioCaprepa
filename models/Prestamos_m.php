<?php
class Prestamos extends db{

	//obtener todos los prestamos
	function get_all(){
		try {
			$SQL = "SELECT prestamos.id,clientes.nombre,clientes.apellidos,montos.monto,plazos.plazo,prestamos.fecha FROM prestamos
                left join clientes on clientes.id = prestamos.idcliente
                left join montos on montos.id = prestamos.idmonto
                left join plazos on plazos.id = prestamos.idplazo";
			$result = $this->connect()->prepare($SQL);
			$result->execute();
			return $result->fetchAll(PDO::FETCH_OBJ);	
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

    //obtener todos los prestamos por nombre
	function get_all_by_name($nombre){
		try {
			$SQL = "SELECT prestamos.id,clientes.nombre,clientes.apellidos,montos.monto,plazos.plazo,prestamos.fecha FROM prestamos
                left join clientes on clientes.id = prestamos.idcliente
                left join montos on montos.id = prestamos.idmonto
                left join plazos on plazos.id = prestamos.idplazo
                where LOWER(concat_ws(' ',clientes.nombre,clientes.apellidos)) like '%$nombre%'";
			$result = $this->connect()->prepare($SQL);
			$result->execute();
			return $result->fetchAll(PDO::FETCH_OBJ);	
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//guardar
	function insert($data){
		try {
			$SQL = 'INSERT INTO prestamos (idcliente,idmonto,idplazo) VALUES (?,?,?)';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$data['cliente'],
				$data['monto'],
                $data['plazo']
			));			
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

}
?>