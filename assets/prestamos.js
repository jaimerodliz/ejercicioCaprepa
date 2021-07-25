$( document ).ready(function() {

    //cargar datos en tabla 
    function load_data(){
        $.ajax({        
            type: 'POST',
            url:   '?c=prestamos&m=get_prestamos',
            beforeSend: function () {
                $("#information_prestamos").html("Procesando, espere por favor...");
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

    //cargar select con datos del cliente
    function load_clientes(){
        $.ajax({        
            type: 'POST',
            url:   '?c=clientes&m=get_clientes',
            success:  function (response) {
                try{
                    var json = $.parseJSON(response);
                    var html="<option value='0'>Seleccione un cliente</option>";
                    for(var x=0;x<json.length;x++){
                        html+="<option value='"+json[x]["id"]+"'>"+json[x]["nombre"]+" "+json[x]["apellidos"]+"</option>"
                    }
                    $("#slt_cliente").html(html);
                }catch(e){
                    alertify.error("Error: "+ e);
                }
            }
        });
    }
    load_clientes();

    //cargar select con datos del monto
    function load_montos(){
        $.ajax({        
            type: 'POST',
            url:   '?c=montos&m=get_montos',
            success:  function (response) {
                try{
                    var json = $.parseJSON(response);
                    var html="<option value='0'>Seleccione un monto</option>";
                    for(var x=0;x<json.length;x++){
                        html+="<option value='"+json[x]["id"]+"'>$ "+parseFloat(json[x]["monto"]).toFixed(2)+"</option>"
                    }
                    $("#slt_monto").html(html);
                }catch(e){
                    alertify.error("Error: "+ e);
                }
            }
        });
    }
    load_montos();

    //cargar select con datos del plazo
    function load_plazos(){
        $.ajax({        
            type: 'POST',
            url:   '?c=montos&m=get_plazos',
            success:  function (response) {
                try{
                    var json = $.parseJSON(response);
                    var html="<option value='0'>Seleccione un plazo</option>";
                    for(var x=0;x<json.length;x++){
                        html+="<option value='"+json[x]["id"]+"'>"+json[x]["plazo"]+"</option>"
                    }
                    $("#slt_plazo").html(html);
                }catch(e){
                    alertify.error("Error: "+ e);
                }
            }
        });
    }
    load_plazos();

    //crear tabla principal con los datos
    function create_table(data){
        var html="";
		html+="<table class='table table-bordered'>";
		html+="<thead>";
			html+="<tr>";
				html+="<th>Cliente</th>";
				html+="<th>Monto del Préstamo</th>";
				html+="<th>Plazos</th>";
                html+="<th>Acciones</th>";
				html+="</tr>";
			html+="</thead>";
			   html+="<tbody >";
            if(data.length == 0){
                html+="<tr>";
                    html+="<td colspan='4'>No hay préstamos registrados</td>";
                html+="</tr>";
            }else{
                for(var x=0;x<data.length;x++){
                 html+="<tr data-id='"+data[x]['id']+"' data-nombre='"+data[x]['nombre']+" "+data[x]['apellidos']+"' data-monto='"+data[x]['monto']+"' data-plazo='"+data[x]['plazo']+"' data-fecha='"+data[x]['fecha']+"'>";
                        html+="<td>"+data[x]['nombre']+" "+data[x]['apellidos']+"</td>";
                        html+="<td>"+data[x]['monto']+"</td>";
                        html+="<td>"+data[x]['plazo']+"</td>";
                        html+="<td><span id='btn_mortizacion' class='actualizar'><i class='fas fa-list'></i></span></td>";
                    html+="</tr>";
                }
            }
			
			html+="</tbody>";
		html+="</table>";
        $("#information_prestamos").html(html);
    }

    //limpiar formulario
    function clear_data(){
        $("#formPrestamos")[0].reset();
    }

    $(".close-clear").on("click",function(){
        clear_data();
    });

    //filtrar prestamos por nombre
    $("#inp_nombre").on("keypress",function(e){
        if(e.which == 13) {
            $("#btn_buscar").click();
        }
    });

    $("#btn_buscar").on("click",function(){
        $.ajax({        
            type:'POST',
            url:'?c=prestamos&m=get_prestamos_by_name',
            data:{nombre: $("#inp_nombre").val().trim()},
            beforeSend: function () {
                $("#information_prestamos").html("Procesando, espere por favor...");
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
    });

    $("#btn_nuevo").on('click',function(){
        clear_data();
        $("#modal_nuevo").modal("show");
    });

    function validaciones(){
        var val=1;
        if($("#slt_cliente").val()=="0" || $("#slt_monto").val()=="0" || $("#slt_plazo").val()=="0"){
            val=0;
        }

        return val;
    }

    //guardar prestamo
    $("#btn_guardar").on("click",function(){
        if(validaciones()){
            var form = $('#formPrestamos')[0];
            var formData = new FormData(form);
            $.ajax({
                type:"POST",
                url:'?c=prestamos&m=save_data',
                data: formData,
                processData: false,
                contentType: false,
                success:function(datos){
                    alertify.success('Se ha registrado con éxito el préstamo');

                    //limpiar formulario
                    clear_data();
                    $("#modal_nuevo").modal("hide");

                    //recargar datos en tabla principal
                    load_data();
                }
            });
        }else{
            alertify.error("Complete el formulario correctamente");
        }
    });

    function tabla_amortizacion(nombre,pagos_quin,monto,fecha){
        var abono_quin = monto / pagos_quin;
        var interes=(abono_quin * 0.11);
        var abono_subtotal= abono_quin + interes;

        var html="";
		html+="<table class='table table-bordered'>";
		html+="<thead>";
            html+="<tr>";
                html+="<th colspan='5' style='text-align:left;'>Cliente: "+nombre+"</th>";
            html+="</tr>";
            html+="<tr>";
                html+="<th colspan='5' style='text-align:left;'>No. Pago: 1</th>";
            html+="</tr>";
			html+="<tr>";
				html+="<th>No. Pago</th>";
				html+="<th>Fecha</th>";
				html+="<th>Préstamo</th>";
                html+="<th>Interés</th>";
                html+="<th>Abono</th>";
            html+="</tr>";
			html+="</thead>";
			   html+="<tbody >";

                for(var x=1;x<=pagos_quin;x++){

                    var date = new Date(fecha);
                    var array_fecha=fecha.split("-");

                    //obtener fecha de pago en base al registro del prestamo
                    var fecha_pago;
                    if(array_fecha[2]<=15){
                        //dar formato a la fecha
                        fecha_pago="15/"+array_fecha[1]+"/"+array_fecha[0];
                        
                        //generar nueva fecha para el siguiente pago
                        fecha=array_fecha[0]+"-"+array_fecha[1]+"-16";
                    }else{
                        //obtener ultimo dia del mes
                        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                        var dia = lastDay.getDate();

                        //dar formato a la fecha
                        fecha_pago=dia+"/"+array_fecha[1]+"/"+array_fecha[0];
                        
                        //generar nueva fecha para el siguiente pago
                        var mes = parseInt(array_fecha[1]) + 1;
                        if(mes < 10) mes="0"+mes;
                        fecha=array_fecha[0]+"-"+mes+"-01";
                    }

                    html+="<tr>";
                        html+="<td>"+x+"</td>";
                        html+="<td>"+fecha_pago+"</td>";
                        html+="<td>$ "+parseFloat(abono_quin).toFixed(2)+"</td>";
                        html+="<td>$ "+parseFloat(interes).toFixed(2)+"</td>";
                        html+="<td>$ "+parseFloat(abono_subtotal).toFixed(2)+"</td>";
                    html+="</tr>";
                }
                html+="<tr>";
                    html+="<td></td>";
                    html+="<td>Totales</td>";
                    html+="<td>$ "+parseFloat(monto).toFixed(2)+"</td>";
                    html+="<td>$ "+parseFloat((interes * pagos_quin)).toFixed(2)+"</td>";
                    html+="<td>$ "+parseFloat((abono_subtotal * pagos_quin)).toFixed(2)+"</td>";
                html+="</tr>";
            
			
			html+="</tbody>";
		html+="</table>";
        $("#content_amortizacion").html(html);

        $("#modal_amortizaciones").modal("show");
    }

    $("#information_prestamos").on("click","#btn_mortizacion",function(){
        var objeto=$(this).parent().parent();
        var nombre=objeto.data('nombre');
        var plazo=objeto.data('plazo');
        var monto=objeto.data('monto');
        var fecha=objeto.data('fecha');

        tabla_amortizacion(nombre,plazo,monto,fecha);
    });



});