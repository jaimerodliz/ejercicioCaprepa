<div class="modal" tabindex="-1" id="modal_nuevo_cli">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Clientes</h5>
        <button type="button" class="btn-close close-clear" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
	  	<form method="POST" enctype="multipart/form-data" id="formClientes">
		  	<div class="mb-3">
				<label for="nombres" class="form-label">Nombre(s)</label>
				<input type="text" class="form-control" id="nombres" name="nombres" >
			</div>
			<div class="mb-3">
				<label for="apellidos" class="form-label">Apellido(s)</label>
				<input type="text" class="form-control" id="apellidos" name="apellidos">
			</div>
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="btn_guardar"><i class="far fa-save"></i> Guardar</button>
		<button type="button" class="btn btn-primary d-none" id="btn_editar"><i class="far fa-save"></i> Editar</button>
		<button type="button" class="btn btn-secondary close-clear" data-bs-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
      </div>
    </div>
  </div>
</div>