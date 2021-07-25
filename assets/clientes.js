$( document ).ready(function() {

    var id_cliente=0;
    
    //cargar datos en tabla 
    function load_data(){
        $.ajax({        
            type: 'POST',
            url:   '?c=clientes&m=get_clientes',
            beforeSend: function () {
                $("#information").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                try{
                    var json = $.parseJSON(response);
                    create_table(json);
                }catch(e){
                    alertify.error("Error: "+ e);
                }
            }
        });
    }
    load_data();

    //crear tabla principal con los datos
    function create_table(data){
        var html="";
		html+="<table class='table table-bordered'>";
		html+="<thead>";
			html+="<tr>";
				html+="<th>#</th>";
				html+="<th>Nombre(s)</th>";
				html+="<th>Apellido(s)</th>";
                html+="<th>Acciones</th>";
				html+="</tr>";
			html+="</thead>";
			   html+="<tbody >";
            if(data.length == 0){
                html+="<tr>";
                    html+="<td colspan='3'>No hay clientes registrados</td>";
                html+="</tr>";
            }else{
                for(var x=0;x<data.length;x++){
                 html+="<tr data-id='"+data[x]['id']+"' data-nombre='"+data[x]['nombre']+"' data-apellidos='"+data[x]['apellidos']+"'>";
                        html+="<td>"+data[x]['id']+"</td>";
                        html+="<td>"+data[x]['nombre']+"</td>";
                        html+="<td>"+data[x]['apellidos']+"</td>";
                        html+="<td>";
                            html+="<div class='dropdown'>";
                                html+="<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>Selecciona </button>";
                                html+="<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>";
                                    html+="<li class='dropdown-item actualizar'>Editar</li>";
                                    html+="<li class='dropdown-item borrar'>Borrar</li>";
                                html+="</ul>";
                            html+="</div>";
                        html+="</td>";
                    html+="</tr>";
                }
            }
			
			html+="</tbody>";
		html+="</table>";
        $("#information").html(html);
    }

    //limpiar formulario
    function clear_data(){
        id_cliente=0;
        $("#formClientes")[0].reset();
    }

    function validaciones(){
        var val=0;
        if($("#nombres").val().trim()=="" || $("#apellidos").val().trim()==""){
            val=1;
        }

        return val;
    }

    $(".close-clear").on("click",function(){
        clear_data();
    });

    //Alta de clientes
    $("#btn_nuevo").on('click',function(){
        clear_data();
        $("#btn_guardar").removeClass('d-none');
        $("#btn_editar").addClass('d-none');
        $("#modal_nuevo_cli").modal("show");
    });

    //guardar nuevo cliente
    $("#btn_guardar").on("click",function(){
        if(validaciones()==0){
            var form = $('#formClientes')[0];
            var formData = new FormData(form);
            $.ajax({
                type:"POST",
                url:'?c=clientes&m=save_cliente',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha registrado con éxito el cliente');

                    //limpiar formulario
                    clear_data();
                    $("#modal_nuevo_cli").modal("hide");

                    //recargar datos en tabla principal
                    load_data();
                }
            });
        }else{
            alertify.error("Complete el formulario correctamente");
        }
    });


    //cargar datos para actualizar
    $("#information").on('click','.actualizar',function(){
        clear_data();
        var objeto=$(this).parent().parent().parent().parent();
        //cargar datos
        id_cliente=objeto.data('id');
        $("#nombres").val(objeto.data('nombre'));
        $("#apellidos").val(objeto.data('apellidos'));

        $("#btn_guardar").addClass('d-none');
        $("#btn_editar").removeClass('d-none');
        $("#modal_nuevo_cli").modal("show");
    });

    //actualizar un producto
    $("#btn_editar").on("click",function(){
        console.log(id_cliente,validaciones());
        if(validaciones()==0 && id_cliente != 0){
            //cargar datos para envio
            var form = $('#formClientes')[0];
            var formData = new FormData(form);
            formData.append('id',id_cliente);

            //enviar datos por ajax
            $.ajax({
                type:"POST",
                url:'?c=clientes&m=edit_clientes',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha actualizado con éxito el cliente');
                    //limpiar formulario
                    clear_data();
                    $("#modal_nuevo_cli").modal("hide");
                    //recargar datos en tabla principal
                    load_data();
                }
            });
        }else{
            alertify.error("Complete el formulario correctamente");
        }
    });

    //eliminar registro
    $("#information").on('click','.borrar',function(){
        //obtener id
        var objeto=$(this).parent().parent().parent().parent();
        var id=objeto.data('id');
        alertify.confirm('Eliminar', '¿Desea eliminar el cliente seleccionado?', function(){ 
            
            var formData = new FormData();
            formData.append('id',id);

            //enviar datos por ajax
            $.ajax({
                type:"POST",
                url:'?c=clientes&m=eliminar_clientes',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha eliminado con éxito el cliente');
                    //recargar datos en tabla principal
                    load_data();
                }
            });
        }, function(){}).set('labels', {ok:'Si', cancel:'No'});
    });


});