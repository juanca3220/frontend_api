var isSending = false;

var $formLogin = $();
var $submitLoginBtn = $();

$(document).ready(function () {

    $formLogin = $('#form_login');
    $submitLoginBtn = $('#submit_login_btn');

    $formLogin.attr({'action': 'javascript:void(0)'})
        .on('submit',function(e) {
            e.preventDefault();
            return false;
        });

    $submitLoginBtn.on('click', function(e) {
        e.preventDefault();

        var parametros = $formLogin.serialize();
        var ruta = rutaLogin;
        enviarLogin(parametros,ruta);
    });

});

function validarCampos($form){

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

function enviarLogin(parametros, ruta) {

    if(isSending) {
        return null;
    }

    if(! validarCampos($formLogin)) {
        return null;
    }

    isSending = true;

    $submitLoginBtn.text('Enviando…');
    $submitLoginBtn.addClass('disabled').prop('disabled',true).attr('disabled','disabled');

    $.ajax({
        url: ruta,
        type: 'post',
        dataType: 'json',
        data: parametros,
    }).done( function(data) {

        if(data.status == 200){

            if(data.body.id == ''){
                alert(data.body.msg);
            }
            else{
                let id = data.body.id;
                let token = data.body.token;

                localStorage.setItem('token', token);
                localStorage.setItem('id', id);

                location.href = rutaPartidos;
            }
        }
        else{
            alert(data.msg);
        }

    }).fail( function( jqXHR, textStatus, errorThrown ) {
        msg_errors(jqXHR, textStatus, errorThrown);
    }).always( function() {
        isSending = false;
        $submitLoginBtn.text('Iniciar sesión');
        $submitLoginBtn.removeClass('disabled').prop('disabled',false);
    });

}
