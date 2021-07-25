<?php
class Clientes extends db{

	//obtener todos los clientes
	function get_all_clientes(){
		try {
			$SQL = "SELECT * FROM clientes";
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
			$SQL = 'INSERT INTO clientes (nombre,apellidos) VALUES (?,?)';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$data['nombre'],
				$data['apellidos']
			));			
		}catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//actualizar
	function update($data){
		try {
			$SQL = 'UPDATE clientes SET nombre = ?,apellidos = ? WHERE id = ?';
			$result = $this->connect()->prepare($SQL);
			$result->execute(array(
				$data['nombre'],
				$data['apellidos'],
				$data['id']
			));			
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	//eliminar un cliente
	function delete($id){
		try {
			$SQL = 'DELETE FROM clientes WHERE id = ?';
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