<?php

class clientesController extends Clientes{

	function index(){
		require_once('views/layout/header.php');
		require_once('views/layout/nav.php');
		require_once('views/clientes/clientes_v.php');
		require_once('views/clientes/modals.php');
		require_once('views/layout/footer.php');
	}

	//Obtener todos los clientes
	function get_clientes(){
		$data = parent::get_all_clientes();
		echo json_encode($data);
	}

	//guardar el cliente
	function save_cliente(){
		$nombre= trim($_POST['nombres']);
		$apellidos= trim($_POST['apellidos']);

		$data = array(
			'nombre'=> $nombre,
			'apellidos'=> $apellidos
		);

		parent::insert($data);	
	}

	//editar el cliente seleccionado
	function edit_clientes(){
		$id= trim($_POST['id']);
		$nombre= trim($_POST['nombres']);
		$apellidos= trim($_POST['apellidos']);

		$data = array(
			'id' => $id,
			'nombre'=> $nombre,
			'apellidos'=> $apellidos
		);

		parent::update($data);
	}
    
	//eliminar un cliente
	function eliminar_clientes(){	
		$id= trim($_POST['id']);
		parent::delete($id);
    }  
    
}

