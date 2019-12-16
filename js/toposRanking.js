var ranking = []

function initView() {
    //Home click
    $('#buttonHome').click(function () {
        window.location = "./repositorioJuegos.html";
    });
    getCookieValues();
    if (ranking[0].value != undefined) {
        bindView();
    }
}

function bindView() {
    var count = 1;
    for (var i = ranking.length - 1; i >= 0; i--) {
        var nameId = "name" + count
        var pointId = "point" + count

        document.getElementById(nameId).innerHTML = ranking[i].name
        document.getElementById(pointId).innerHTML = ranking[i].value
        count++;
    }
}

//Get all cookies points
function getCookieValues() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        var cookieValue = cookie.split("=")
        var person = {
            name: cookieValue[0],
            value: cookieValue[1]
        }
        ranking[i] = person;
    }
    ranking.sort(function (a, b) {
        return Number(a.value) - Number(b.value);
    })
}