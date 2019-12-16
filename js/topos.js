var moles;
var random;
var name;
var points = 0;
var intervalTopos;
var ranking = [];

const shake = {
  RIGHT: 3,
  LEFT: -3,
  CENTER: 32.5
};

const TIME = 30;

//Iniciar View con Modal
function initView(){
  $('#nameModal').modal()
  $('#buttonAccept').click(function () {
    name = document.getElementById("inputName").value;
    bindView();
  });
}

//Iniciar elementos
function bindView() {
  getCookieValues();
  moles = document.getElementsByClassName("topo");
  timer();
  for (var i = 0; i < moles.length; i++) {
    moles[i].addEventListener("click", function () {
      addPoint(), moleShake();
    });
  }
  intervalTopos = setInterval(showRandom, 1000);

  $('#buttonHome').click(function () {
    window.location = "./repositorioJuegos.html";
  });
}

//Sumar punto
function addPoint() {
  points = points + 1;
  document.getElementById("points").innerHTML = points;
  disableDiv();
}

//Escoger elemento random
function showRandom() {
  random = Math.floor(Math.random() * moles.length);
  var pos = 0;

  //Mostrar y ocultar elemento
  var show = setInterval(showMole, 20);
  function showMole() {
    if (pos == 45) {
      var hide = setInterval(hideMole, 20);
      function hideMole() {
        if (pos == 0) {
          clearInterval(hide);
          enableDiv();
        } else {
          pos -= 2.5;
          moles[random].style.bottom = pos + "%";
        }
      }
      clearInterval(show);
    } else {
      pos += 2.5;
      moles[random].style.bottom = pos + "%";
    }
  }
}

//Animación al pulsar
function moleShake() {
  var mole = moles[random];
  var shakeInterval = setInterval(shakeMole, 60);
  var direction = true;
  function shakeMole() {
    if (mole.style.bottom != 0 + "%") {
      mole.style.left = shake.CENTER + "%";
      if (direction) {
        mole.style.left = shake.CENTER + shake.RIGHT + "%";
        direction = false;
      } else {
        mole.style.left = shake.CENTER + shake.LEFT + "%";
        direction = true;
      }
    } else {
      mole.style.left = shake.CENTER + "%";
      clearInterval(shakeInterval);
    }
  }
}

//Timer
function timer() {
  var divTimer = document.getElementById("timer");
  var secs = TIME;

  var time = setInterval(coundown, 1000);
  function coundown() {
    divTimer.innerHTML = secs-- + "s";
    if (secs < 0) {
      openModal();
      clearInterval(time);
      clearInterval(intervalTopos);
    }
  }
}

//Enable div
function disableDiv() {
  moles[random].style.pointerEvents = "none";
}

//Disable div
function enableDiv() {
  moles[random].style.pointerEvents = "auto";
}

//Open model
function openModal() {

  $('#exampleModalCenter').modal()
  document.getElementById("score").innerHTML = points

  $('#buttonClose').click(function () {
    checkScore(name, points);
    window.location = "./toposRanking.html";
  });

  $('#buttonAgain').click(function () {
    window.location = "./topos.html";
  });
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
  ranking.sort(function(a, b){
    return Number(a.value) - Number(b.value);
  })
}

//Check if its better
function checkScore(name, points){
  var salir = true;
  var count = ranking.length;
  if(count >= 5){
    while(salir && count >= 0){
      if(points > ranking[count - 1].value){
        deleteCookie(ranking[0].name)
        addCookie(name, points);
        salir = false;
      }else{
        count--;
      }
    }
  }else{
    addCookie(name, points);
  }
}

//Add/Edit cookie
function addCookie(name, points) {
  var d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + points + ";" + expires + ";path=/";
}

//Delete cookie
function deleteCookie(cName){
  document.cookie= cName + "=;expires=Thu; 01 Jan 1970"
}