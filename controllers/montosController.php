<?php

class montosController extends Montos{
    function index(){
		require_once('views/layout/header.php');
		require_once('views/layout/nav.php');
		require_once('views/montos/montos_v.php');
		require_once('views/montos/modals.php');
		require_once('views/layout/footer.php');
	}

	
	function get_montos(){
		$data = parent::get_all_montos();
		echo json_encode($data);
	}

	function get_plazos(){
		$data = parent::get_all_plazos();
		echo json_encode($data);
	}

	//guardar monto/plazos
	function save_data(){
		$dato= trim($_POST['inp_alta']);
		$tipo= trim($_POST['tipo']);

		//asignar tabla
		$tabla=($tipo==0)?'montos':'plazos';
		$col=($tipo==0)?'monto':'plazo';

		$data = array(
			'tabla' => $tabla,
			'columna'=> $col,
			'dato'=> $dato
		);

		parent::insert($tabla,$col,$dato);	
	}

	//eliminar monto/plazos
	function eliminar_datos(){	
		$id= trim($_POST['id']);
		$tipo= trim($_POST['tipo']);

		//asignar tabla
		$tabla=($tipo==0)?'montos':'plazos';

		parent::delete($id,$tabla);
    } 
}