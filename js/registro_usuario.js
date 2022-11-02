var isSending = false;

var $formRegistro = $();
var $submitRegistroBtn = $();

$(document).ready(function () {

    $formRegistro = $('#form_registro');
    $submitRegistroBtn = $('#submit_registro_btn');

    $formRegistro.attr({'action': 'javascript:void(0)'})
        .on('submit',function(e) {
            e.preventDefault();
            return false;
        });

    $submitRegistroBtn.on('click', function(e) {
        e.preventDefault();

        var parametros = $formRegistro.serialize();
        var ruta = rutaRegistro;
        enviarRegistro(parametros,ruta);
    });

});

function validarCampos($form){

    var $nombre = $('#nombre', $form);
    if( ! isNoEmpty($nombre.val()) ){
        alert('Debes indicar un nombre')
        return false;
    }

    var $correo = $('#correo', $form);
    if( ! isNoEmpty($correo.val()) ){
        alert('Debes indicar un correo')
        return false;
    }

    var $username = $('#username', $form);
    if( ! isNoEmpty($username.val()) ){
        alert('Debes indicar un username')
        return false;
    }

    var $password = $('#password', $form);
    if( ! isNoEmpty($password.val()) ){
        alert('Debes indicar un password')
        return false;
    }

    return true;
}

function enviarRegistro(parametros, ruta) {

    if(isSending) {
        return null;
    }

    if(! validarCampos($formRegistro)) {
        return null;
    }

    isSending = true;

    $submitRegistroBtn.text('Enviando…');
    $submitRegistroBtn.addClass('disabled').prop('disabled',true).attr('disabled','disabled');

    $.ajax({
        url: ruta,
        type: 'post',
        dataType: 'json',
        data: parametros,
    }).done( function(data) {
        console.log(data);
        alert(data.body);
        $formRegistro.trigger("reset");

    }).fail( function( jqXHR, textStatus, errorThrown ) {
        msg_errors(jqXHR, textStatus, errorThrown);
    }).always( function() {
        isSending = false;
        $submitRegistroBtn.text('Registrarse');
        $submitRegistroBtn.removeClass('disabled').prop('disabled',false);
    });

}
