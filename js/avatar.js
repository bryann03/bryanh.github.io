var images = {};

//piezas de el personaje
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;

var bIncremento = 0.3;
var breathDir = 1;
var respiro = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);

var jumping = false;
var saluding = false;
var hablando = false;

var x = -50;
var y = 90;

//cargo las imagenes por separado
function loadImage(name) {
  images[name] = new Image();
  images[name].onload = function() {
    resourceLoaded();
  };
  images[name].src = 'img/avatar/' + name + '.png';
}

//necesito las primeras 5 imagenes para dibujar el avatar
function resourceLoaded() {
  numResourcesLoaded += 1;
  if (numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps);
  }
}

//posicion inicial

function showAvatar(canvasDiv) {
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', 700);
  canvas.setAttribute('height', 450);
  canvas.setAttribute('id', 'canvas');
  canvasDiv.appendChild(canvas);

  //canvas.scale(2, 2);
  context = canvas.getContext('2d');

  loadImage('pie_der');
  loadImage('pie_left');
  loadImage('torso');
  loadImage('rightArmRest');
  loadImage('leftArmRest');

  loadImage('burbuja');

  loadImage('leftArm');
  loadImage('rightArm');
  loadImage('pie_jump');
}

function redraw() {
  canvas.width = canvas.width; //limpia el canvas

  if (jumping) {
    salto(x, y);
  } else if (saluding) {
    saludo(x, y);
  } else {
    still(x, y);
  }
  if (hablando) {
    showBub();
  }
}

function separar(texto) {
  var index = 0;
  var limite = 80;
  //var dice = quedice.innerText;
  var separado = [];
  if (texto.length >= limite) {
    var resto = texto;
    while (resto.length >= limite) {
      var actual = resto.substr(0, limite);
      // para no cortar palabras, muestro hasta el ultimo espacio
      actual = actual.substr(
        0,
        Math.min(actual.length, actual.lastIndexOf(' '))
      );

      separado[index] = actual;
      index++;

      //el resto desde donde se quedo el anterior texto
      resto = resto.substr(actual.length);
    }
    separado[index] = resto;
  } else {
    separado[index] = texto;
  }

  return separado;
  //clear chat
}

function dira(texto) {
  var lista = separar(texto);
  tiempo = 1;
  if (!hablando) {
    hablando=true;
    var wordLoop = function(i) {
      if (lista[i]) {
        document.getElementById('textoAvatar').innerText = lista[i];
        setTimeout(function() {
          wordLoop(i + 1);
        }, 3000);
      } else {
        hablando = false;
        document.getElementById('textoAvatar').innerText = '';
      }
    };
    wordLoop(0);
  }
  hi();
}


function showBub() {
  context.drawImage(images['burbuja'], x + 330, y - 90, 370, 280);
}

function saludo(x, y) {
  shadow(x, y);

  context.drawImage(images['pie_der'], x + 160, y + 253, 79, 97);
  context.drawImage(images['pie_left'], x + 240, y + 253, 79, 97);

  context.drawImage(images['rightArm'], x + 58, y + 104, 69, 87 - respiro);
  context.drawImage(images['leftArmRest'], x + 335, y + 143, 69, 87 - respiro);

  context.drawImage(images['torso'], x + 20, y, 390, 366 - respiro);
}

function still(x, y) {
  shadow(x, y);

  context.drawImage(images['pie_der'], x + 160, y + 253, 79, 97);
  context.drawImage(images['pie_left'], x + 240, y + 253, 79, 97);

  context.drawImage(images['rightArmRest'], x + 58, y + 149, 69, 87 - respiro);
  context.drawImage(images['leftArmRest'], x + 335, y + 143, 69, 87 - respiro);

  context.drawImage(images['torso'], x + 20, y, 390, 366 - respiro);
}
function jump() {
  if (!jumping) {
    jumping = true;
    setTimeout(quieto, 200);
  }
}

function hi() {
  if (!saluding) {
    saluding = true;
    setTimeout(quieto, 1000);
  }
}

function quieto() {
  jumping = false;
  saluding = false;
}

function salto(x, y) {
  shadow(x, y);

  //salto
  y -= 65;

  context.drawImage(images['pie_jump'], x + 225, y + 254, 79, 97);
  context.drawImage(images['pie_jump'], x + 145, y + 254, 79, 97);

  context.drawImage(images['rightArm'], x + 50, y + 97, 79, 97);
  context.drawImage(images['leftArm'], x + 326, y + 113, 79, 97);

  context.drawImage(images['torso'], x + 20, y, 390, 366);
}

function shadow(x, y) {
  drawEllipse(x + 230, y + 325, 300, 6);
}

function drawEllipse(centerX, centerY, width, height) {
  context.beginPath();

  context.moveTo(centerX, centerY - height / 2);

  context.bezierCurveTo(
    centerX + width / 2,
    centerY - height / 2,
    centerX + width / 2,
    centerY + height / 2,
    centerX,
    centerY + height / 2
  );

  context.bezierCurveTo(
    centerX - width / 2,
    centerY + height / 2,
    centerX - width / 2,
    centerY - height / 2,
    centerX,
    centerY - height / 2
  );

  context.fillStyle = 'black';
  context.fill();
  context.closePath();
}

function updateBreath() {
  if (breathDir === 1) {
    // breath in
    respiro -= bIncremento;
    if (respiro < -breathMax) {
      breathDir = -1;
    }
  } else {
    // breath out
    respiro += bIncremento;
    if (respiro > breathMax) {
      breathDir = 1;
    }
  }
}
