<div class="modal" tabindex="-1" id="modal_nuevo">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="h5_title"></h5>
        <button type="button" class="btn-close close-clear" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form method="POST" enctype="multipart/form-data" id="formAlta">
		  	  <div class="mb-3">
				    <label for="inp_alta" class="form-label" id="lbl_alta"></label>
				    <input type="number" class="form-control" id="inp_alta" name="inp_alta" >
			    </div>
		    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="btn_guardar"><i class="far fa-save"></i> Guardar</button>
		    <button type="button" class="btn btn-secondary close-clear" data-bs-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
      </div>
    </div>
  </div>
</div>