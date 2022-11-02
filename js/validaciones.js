function isNoEmpty(valor) {
    valor = $.trim(valor);
    if( valor == null || valor == '' || valor.length == 0 || /^\s+$/.test(valor) ) {
        return false;
    }
    return true;
}

function validInteger(valor) {
    valor = $.trim(valor);
    if( valor == null || valor == '' || valor.length == 0 || ! /^\d+$/.test(valor)) {
        return false;
    }
    return true;
}