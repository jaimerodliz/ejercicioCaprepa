<?php
class Montos extends db{

	//obtener montos
	function get_all_montos(){
		try {
			$SQL = "SELECT * FROM montos order by monto ASC";
			$result = $this->connect()->prepare($SQL);
			$result->execute();
			return $result->fetchAll(PDO::FETCH_OBJ);	
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

    //obtener plazos
    function get_all_plazos(){
		try {
			$SQL = "SELECT * FROM plazos order by plazo ASC";
			$result = $this->connect()->prepare($SQL);
			$result->execute();
			return $result->fetchAll(PDO::FETCH_OBJ);	
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//guardar datos monto/plazos
	function insert($tabla,$col,$dato){
		try {
			$SQL = "INSERT INTO $tabla ($col) VALUES (?)";
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$dato
			));			
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}


	//eliminar
	function delete($id,$tabla){
		try {
			$SQL = "DELETE FROM $tabla WHERE id = ?";
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$id
			));			
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}	
}
?>