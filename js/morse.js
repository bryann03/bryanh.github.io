var jugador = document.getElementById("jugador").innerHTML; //innerHTML para coger los datos del div
//var puntos = document.getElementById("puntos");
var palabra = document.getElementById("nuevaPalabra");
var btnSi = document.getElementById("si");
var btnNo = document.getElementById("no");
var pantallaW = 1500;
var splitParaula;
var letra;
var lletra;
var interval;
var posRan = posRan;
//puntos.textContent = 1000;

initPalabra();
programa();

//#region  FUNCION MOVER JUGADOR
$(document).on("keydown", function (e) {
  // e stands for "event" - the event is the keypress
  // e.key means the key that was pressed
  switch (e.key) {
    // left arrow pressed
    case "ArrowLeft":
      $("#jugador").animate(
        {
          left: "-=10px"
        },
        "fast"
      );
      break;
    // right arrow pressed
    case "ArrowRight":
      $("#jugador").animate(
        {
          left: "+=10px"
        },
        "fast"
      );
      break;
  }
});
//#endregion

//#region ----FUNCIONES----
//#region Funciones arreys aleatorias
function getRandomLetra() {
  // get a new random number
  var num = Math.floor(Math.random() * 18);
  //#region  array letras
  var abc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "I",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U"
  ];
  //#endregion
  return abc[num];
}
function getRandomPalabra() {
  // get a new random number
  var num = Math.floor(Math.random() * 6);
  var word = [
    "ONDAS SONORAS",
    "AMPLIFICADOR",
    "AUDIOFREQUENCIA",
    "TRANSMISION",
    "ANTENA",
    "OSCILADOR"
  ];
  return word[num];
  //document.querySelector("#palabra").textContent = num;
}
//#endregion

function programa() {
  letra = getRandomLetra();
  crearLletra(letra);
  setInterval(colision, 1000, letra, jugador);
}

function initPalabra() {
  palabra.textContent = getRandomPalabra();
  nuevaPalabra = palabra.textContent.replace(/ /g, ""); // si hay espacios en la palabra lo quito
  splitParaula = nuevaPalabra.split(""); //separa por caracteres
}
function crearLletra(value) {
  $("#pantalla").append('<div class="caida" id="' + value + '"> ' + value + "</div>");
  posRan = Math.floor(Math.random() * pantallaW);
  //document.getElementById(value).style.left = posRan + "px"; //para cambiar la posicion de inicio
}

function colision(letra, jugador) {

  var ediv1 = document.getElementById('jugador');
  var ediv2 = document.getElementById(letra);

  ediv1.top = $(ediv1).offset().top;
  ediv1.left = $(ediv1).offset().left;
  ediv1.right = Number($(ediv1).offset().left) + Number($(ediv1).width());
  ediv1.bottom = Number($(ediv1).offset().top) + Number($(ediv1).height());

  if (ediv2) {
    ediv2.top = $(ediv2).offset().top;
    ediv2.left = $(ediv2).offset().left;
    ediv2.right = Number($(ediv2).offset().left) + Number($(ediv2).width());
    ediv2.bottom = Number($(ediv2).offset().top) + Number($(ediv2).height());
    console.log(ediv2.top + ' ' + ediv2.left);
    if (ediv1.right > ediv2.left && ediv1.left < ediv2.right && ediv1.top < ediv2.bottom && ediv1.bottom > ediv2.top) {
      for (var lletra in splitParaula) {
        //agafo cada lletra de la paraula
        if (splitParaula[lletra] === letra) { // i la comparo amb el valor del div
          //delete splitParaula[lletra]; //si coincideix l'elimino 
          splitParaula.splice(lletra, 1);
          document.getElementById("nuevaPalabra").innerHTML = splitParaula.join("");
          //$(".caida").remove();
        }
      }
    }
    if (splitParaula.length != 0) {
      setTimeout(programa, 2000);
      $(".caida").remove();
    }
    else {
      $('#exampleModalCenter').modal();
      btnSi.addEventListener("click", function botonSi() {
        location.reload();
      })
      btnNo.addEventListener("click", function botonNo() {
        //vuelve menu principal
      });


    }
  }
}
//#endregion
