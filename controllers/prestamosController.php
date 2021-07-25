<?php

class prestamosController extends Prestamos{
    function index(){
		require_once('views/layout/header.php');
		require_once('views/layout/nav.php');
		require_once('views/prestamos/prestamos_v.php');
		require_once('views/prestamos/modals.php');
		require_once('views/layout/footer.php');
	}

	//obtener todos los prestamos
	function get_prestamos(){
		$data = parent::get_all();
		echo json_encode($data);
	}

	function get_prestamos_by_name(){
		$nombre= strtolower(trim($_POST['nombre']));
		$data = parent::get_all_by_name($nombre);
		echo json_encode($data);
	}

	//guardar el prestamo
	function save_data(){
		$cliente= trim($_POST['slt_cliente']);
		$monto= trim($_POST['slt_monto']);
		$plazo= trim($_POST['slt_plazo']);

		$data = array(
			'cliente'=> $cliente,
			'monto'=> $monto,
			'plazo'=>$plazo
		);

		parent::insert($data);	
	}
}