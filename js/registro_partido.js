var isSending = false;

var $formRegistro = $();
var $submitRegistroBtn = $();

$(document).ready(function () {

    $formRegistro = $('#form_registro');
    $submitRegistroBtn = $('#submit_registro_btn');

    listarEquipos();

    $formRegistro.attr({'action': 'javascript:void(0)'})
        .on('submit',function(e) {
            e.preventDefault();
            return false;
        });

    $submitRegistroBtn.on('click', function(e) {
        e.preventDefault();

        var ruta = rutaRegistroPartido;
        enviarRegistro(ruta);
    });

});

function listarEquipos() {

    $.ajax({
        url: rutaBuscarEquipos,
        type: 'get',
        dataType: 'json',
        data: [],
        headers: {'Authorization': 'Bearer '+token},
    }).done( function(data) {
        console.log(data);
        $arryEquipos = data.body;

        let options = '';

        $.each($arryEquipos, function (index, elem) {
            options += '<option value="'+elem.id+'">'+elem.nombre+'</option>';
        });

        $('#local').html(options);
        $('#visitante').html(options);

    }).fail( function( jqXHR, textStatus, errorThrown ) {
        msg_errors(jqXHR, textStatus, errorThrown);
    }).always( function() {

    });

}

function validarCampos($form){

    var $local = $('#local', $form);
    if( ! isNoEmpty($local.val()) ){
        alert('Debes indicar un equipo local')
        return false;
    }

    var $visitante = $('#visitante', $form);
    if( ! isNoEmpty($visitante.val()) ){
        alert('Debes indicar un equipo visitante')
        return false;
    }

    var $fecha = $('#fecha', $form);
    if( ! isNoEmpty($fecha.val()) ){
        alert('Debes indicar una fecha')
        return false;
    }

    return true;
}

function enviarRegistro(ruta) {

    if(isSending) {
        return null;
    }

    if(! validarCampos($formRegistro)) {
        return null;
    }

    isSending = true;

    $submitRegistroBtn.text('Enviando…');
    $submitRegistroBtn.addClass('disabled').prop('disabled',true).attr('disabled','disabled');

    let parametros = {
        "usuario" : localStorage.getItem('id'),
        "local" : $('#local').val(),
        "visitante" : $('#visitante').val(),
        "fecha" : $('#fecha').val(),
    };

    $.ajax({
        url: ruta,
        type: 'post',
        dataType: 'json',
        data: parametros,
        headers: {'Authorization': 'Bearer '+token},
    }).done( function(data) {
        console.log(data);
        alert(data.body);
        location.href = rutaPartidos;

    }).fail( function( jqXHR, textStatus, errorThrown ) {
        msg_errors(jqXHR, textStatus, errorThrown);
    }).always( function() {
        isSending = false;
        $submitRegistroBtn.text('Registrarse');
        $submitRegistroBtn.removeClass('disabled').prop('disabled',false);
    });

}
