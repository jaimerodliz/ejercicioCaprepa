<div class="container">
	<div class="row">
		<div class="col-md-12 mb-5 d-flex justify-content-center">
			<h1>Préstamos</h1>
		</div>
	</div>
	<div class="row mb-3">
		<div class="col-8">
			<div class="col-6">
				<label for="inp_nombre"><b>Cliente:</b></label>
				<div class="input-group mb-3">
  					<input type="text" class="form-control" placeholder="Nombre del cliente" id="inp_nombre" name="inp_nombre">
  					<span class="btn btn-primary" id="btn_buscar"><i class="fas fa-search"></i></span>
				</div>
			</div>
		</div>
		<div class="col-4">
			<button type="button" class="btn btn-success btn-lg " id="btn_nuevo" style="margin-top:1rem;float: right;">Agregar Préstamo</button>
		</div>
	</div>

	<div class="row">
		<div class="col">
			<div id="information_prestamos"></div>
		</div>
	</div>
</div>

<script type="text/javascript" src="assets/prestamos.js"></script>