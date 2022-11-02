var $formEditar = $();
var $submitEditBtn = $();

$(document).ready(function () {

    $formEditar = $('#form_editar');
    $submitEditBtn = $('#submit_editar_btn');

    $formEditar.attr({'action': 'javascript:void(0)'})
        .on('submit',function(e) {
            e.preventDefault();
            return false;
        });

    listarPartidos();

    let modal = document.getElementById("myModalEditar");
    let span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $submitEditBtn.on('click', function(e) {
        e.preventDefault();
        var parametros = $formEditar.serialize();
        var ruta = rutaEditarPartido;
        enviarEditar(parametros,ruta);
    });

});

function listarPartidos() {

    $.ajax({
        url: rutaPartidos,
        type: 'get',
        dataType: 'json',
        data: [],
        headers: {'Authorization': 'Bearer '+token},
    }).done( function(data) {
        console.log(data);
        $arryPartidos = data.body;

        let filas = '';

        $.each($arryPartidos, function (index, elem) {
            let goles_local = (elem.goles_local != null)? elem.goles_local: '';
            let goles_visitante = (elem.goles_visitante != null)? elem.goles_visitante: '';
                filas +='<tr>' +
                '<td>'+elem.usuario+'</td>' +
                '<td>'+elem.local+'</td>' +
                '<td>'+elem.visitante+'</td>' +
                '<td>'+moment(elem.fecha).format('YYYY-MM-DD')+'</td>' +
                '<td>'+goles_local+'</td>' +
                '<td>'+goles_visitante+'</td>' +
                '<td>';
                if(elem.goles_local == null){
                    filas += '<button class="btn_modal" id="'+elem.id+'">Editar</button>';
                }
                filas += '</td>' +
                '</tr>';
        });

        $('#lista_partidos').html(filas);

        $('.btn_modal').on('click', function (e){
            e.preventDefault();
            let $this = $(this);
            let id = $this.attr('id');
            $('#id_editar').val(id);
            $('#myModalEditar').css('display', 'block');
        });

    }).fail( function( jqXHR, textStatus, errorThrown ) {
        msg_errors(jqXHR, textStatus, errorThrown);
    }).always( function() {

    });

}

function validarCampos($form){

    var $goles_local = $('#goles_local', $form);
    if( ! isNoEmpty($goles_local.val()) ){
        alert('Debes indicar los goles local')
        return false;
    }
    if( ! validInteger($goles_local.val()) ){
        alert('Los goles locales deben ser numeros enteros')
        return false;
    }

    var $goles_visitante = $('#goles_visitante', $form);
    if( ! isNoEmpty($goles_visitante.val()) ){
        alert('Debes indicar los goles visita')
        return false;
    }
    if( ! validInteger($goles_visitante.val()) ){
        alert('Los goles visita deben ser numeros enteros')
        return false;
    }

    return true;
}

function enviarEditar(parametros, ruta) {

    if(! validarCampos($formEditar)) {
        return null;
    }

    $submitEditBtn.text('Enviando…');
    $submitEditBtn.addClass('disabled').prop('disabled',true).attr('disabled','disabled');

    $.ajax({
        url: ruta,
        type: 'PUT',
        dataType: 'json',
        data: parametros,
        headers: {'Authorization': 'Bearer '+token},
    }).done( function(data) {
        console.log(data);
        $('#myModalEditar').css('display', 'none');
        $formEditar.trigger("reset");
        alert(data.body);

        listarPartidos();

    }).fail( function( jqXHR, textStatus, errorThrown ) {
        msg_errors(jqXHR, textStatus, errorThrown);
    }).always( function() {
        isSending = false;
        $submitEditBtn.text('Editar');
        $submitEditBtn.removeClass('disabled').prop('disabled',false);
    });

}