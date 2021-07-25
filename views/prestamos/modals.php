<div class="modal" tabindex="-1" id="modal_nuevo">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Alta Préstamos</h5>
        <button type="button" class="btn-close close-clear" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form method="POST" enctype="multipart/form-data" id="formPrestamos">
		  	    <div class="mb-3">
				    <label for="slt_cliente" class="form-label">Clientes</label>
				    <select name="slt_cliente" id="slt_cliente" class="form-select">
                    </select>
			    </div>
                <div class="mb-3">
				    <label for="slt_monto" class="form-label">Monto</label>
				    <select name="slt_monto" id="slt_monto" class="form-select">
                    </select>
			    </div>
                <div class="mb-3">
				    <label for="slt_plazo" class="form-label">Plazo</label>
				    <select name="slt_plazo" id="slt_plazo" class="form-select">
                    </select>
			    </div>
		    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="btn_guardar"><i class="far fa-save"></i> Guardar</button>
		    <button type="button" class="btn btn-secondary close-clear" data-bs-dismiss="modal"><i class="fas fa-times"></i> Close</button>
      </div>
    </div>
  </div>
</div>

<!--Modal amortizaciones -->
<div class="modal" tabindex="-1" id="modal_amortizaciones">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Tabla de Amortización</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <div id="content_amortizacion">

          </div>
      </div>
      <div class="modal-footer">
		    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fas fa-times"></i> Cerrar</button>
      </div>
    </div>
  </div>
</div>