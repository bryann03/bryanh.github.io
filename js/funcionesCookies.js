function crearCookie(clave, valor, diasExpiracion)
{
    var d = new Date();
    d.setTime(d.getTime() + (diasExpiracion*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = clave + "=" + valor + "; " + expires;
}

function obtenerCookie(clave)
{
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function comprobarCookie(clave) {
    var clave = obtenerCookie(clave);
    if (clave!="") {
        alert("LA COOKIE EXITE");
    }else{
        alert("LA COOKIE NO EXITE");
    }
}