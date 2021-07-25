$( document ).ready(function() {

    var id_dato=0;
    var tipo_alta=0;//0= monto, 1=plazos
    
    //cargar datos en tabla 
    function load_data_montos(){
        $.ajax({        
            type: 'POST',
            url:   '?c=montos&m=get_montos',
            beforeSend: function () {
                $("#information").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                try{
                    var json = $.parseJSON(response);
                    create_table(json,0);
                }catch(e){
                    alertify.error("Error: "+ e);
                }
            }
        });
    }

    function load_data_plazos(){
        $.ajax({        
            type: 'POST',
            url:   '?c=montos&m=get_plazos',
            beforeSend: function () {
                $("#information").html("Procesando, espere por favor...");
            },
            success:  function (response) {
                try{
                    var json = $.parseJSON(response);
                    create_table(json,1);
                }catch(e){
                    alertify.error("Error: "+ e);
                }
            }
        });
    }

    load_data_montos();
    load_data_plazos();

    //crear tabla principal con los datos
    function create_table(data,tipo){
        var description=(tipo==0)?'Montos':'Plazos';
        var tipo_dato=(tipo==0)?'monto':'plazo';

        var html="";
		html+="<table class='table table-bordered'>";
		html+="<thead>";
			html+="<tr>";
				html+="<th>"+description+"</th>";
                html+="<th>Acciones</th>";
				html+="</tr>";
			html+="</thead>";
			   html+="<tbody >";
            if(data.length == 0){
                html+="<tr>";
                    html+="<td colspan='2'>No hay "+description+" registrados</td>";
                html+="</tr>";
            }else{
                for(var x=0;x<data.length;x++){
                 html+="<tr data-id='"+data[x]['id']+"' data-"+tipo_dato+"='"+data[x][tipo_dato]+"' data-tipo='"+tipo+"'>";
                        html+="<td>"+data[x][tipo_dato]+"</td>";
                        html+="<td>";
                            html+="<div class='dropdown'>";
                                html+="<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>Selecciona </button>";
                                html+="<ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>";
                                    html+="<li class='dropdown-item borrar'>Borrar</li>";
                                html+="</ul>";
                            html+="</div>";
                        html+="</td>";
                    html+="</tr>";
                }
            }
			
			html+="</tbody>";
		html+="</table>";
        $("#information_"+tipo_dato+"").html(html);
    }

    //limpiar formulario
    function clear_data(){
        id_dato=0;
        tipo_alta=0;
        $("#formAlta")[0].reset();
    }

    function validaciones(){
        var val=0;
        if(tipo_alta==0){//monto
            if($("#inp_alta").val().trim()=="" || $.isNumeric($('#inp_alta').val())==false){
                val=1;
            }
        }else{//plazo
            if($("#inp_alta").val().trim()=="" || $.isNumeric($('#inp_alta').val())==false || 
                Number.isInteger(parseFloat($("#inp_alta").val()))==false){
                val=2;
            }
        }
        
        return val;
    }

    $(".close-clear").on("click",function(){
        clear_data();
    });

    //Alta de monto
    $("#btn_nuevo_monto").on('click',function(){
        clear_data();
        tipo_alta=0;

        $("#h5_title").text('Alta montos');
        $("#lbl_alta").text('Monto:');

        $("#modal_nuevo").modal("show");
    });

    $("#btn_nuevo_plazo").on('click',function(){
        clear_data();
        tipo_alta=1;

        $("#h5_title").text('Alta plazos');
        $("#lbl_alta").text('Plazos quincenales:');

        $("#modal_nuevo").modal("show");
    });

    //guardar nuevo cliente
    $("#btn_guardar").on("click",function(){
        var validacion=validaciones();
        if(validacion==0){
            var form = $('#formAlta')[0];
            var formData = new FormData(form);
            formData.append('tipo',tipo_alta);

            $.ajax({
                type:"POST",
                url:'?c=montos&m=save_data',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha guardado con éxito');

                    //recargar datos en tabla principal
                    if(tipo_alta==0){
                        load_data_montos();
                    }else{
                        load_data_plazos();
                    }

                    //limpiar formulario
                    clear_data();
                    $("#modal_nuevo").modal("hide");
                    
                }
            });
        }else if(validacion==1){
            alertify.error("Capture un número valido");
        }else if(validacion==2){
            alertify.error("Capture un número entero valido");
        }
    });


    //eliminar registro
    $("#div_contenido").on('click','.borrar',function(){
        //obtener id
        var objeto=$(this).parent().parent().parent().parent();
        var id=objeto.data('id');
        var tipo=objeto.data('tipo');
        alertify.confirm('Eliminar', '¿Desea eliminar el dato seleccionado?', function(){ 
            
            var formData = new FormData();
            formData.append('id',id);
            formData.append('tipo',tipo);

            //enviar datos por ajax
            $.ajax({
                type:"POST",
                url:'?c=montos&m=eliminar_datos',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha eliminado con éxito');
                    //recargar datos en tabla principal
                    if(tipo==0){
                        load_data_montos();
                    }else{
                        load_data_plazos();
                    }
                }
            });
        }, function(){}).set('labels', {ok:'Si', cancel:'No'});
    });


});