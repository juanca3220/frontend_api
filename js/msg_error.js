function msg_errors(jqXHR, textStatus, errorThrown){
    if (jqXHR.status === 0) {
        $('.failMessage').html('No se pudo conectar: Verifique la red.').show().delay(5000).fadeOut();
    } else if (jqXHR.status == 404) {
        $('.failMessage').html('No se encontró la página solicitada [404]').show().delay(5000).fadeOut();
    } else if (jqXHR.status == 500) {
        $('.failMessage').html('Error interno del servidor [500].').show().delay(5000).fadeOut();
    } else if (textStatus === 'parsererror') {
        $('.failMessage').html('Error al analizar JSON solicitado.').show().delay(5000).fadeOut();
    } else if (textStatus === 'timeout') {
        $('.failMessage').html('Error de tiempo de espera.').show().delay(5000).fadeOut();
    } else if (textStatus === 'abort') {
        $('.failMessage').html('Solicitud de Ajax cancelada.').show().delay(5000).fadeOut();
    } else {
        $('.failMessage').html('Error no detectado: ' + jqXHR.responseText).show().delay(5000).fadeOut();
    }
}

function errorsjs(msg) {
    $('#errorsjs').html(msg);

    setTimeout(
        function(){
            $('#errorsjs').html('');
        }, 5000);
}
