
const RESP_CORRECT_PREGUNTA_1 = "Por las vibraciones en el diafragma";
const RESP_CORRECT_PREGUNTA_2 = "HERTZ";
const RESP_CORRECT_PREGUNTA_3 = "DEL AIRE";
const RESP_CORRECT_PREGUNTA_4 = "AM y FM";
const RESP_CORRECT_PREGUNTA_5 = "SEGÚN SU LONGITUD";

const RESET_POS_INCIAL_BOTTOM = '60px';
const RESET_POS_INCIAL_LEFT = '125px';

const VELOCIDAD_OBJETO = 1;

const PREG_1_MOVE_POS_INCIAL_BOTTOM = -20;
const PREG_1_MOVE_POS_FINAL_BOTTOM = 325;

const PREG_2_MOVE_POS_INICIAL_LEFT = 90;
const PREG_2_MOVE_POS_FINAL_LEFT = 400;

const PREG_3_MOVE_POS_INICIAL_BOTTOM = 400;
const PREG_3_MOVE_POS_FINAL_BOTTOM = 640;

const PREG_4_MOVE_POS_INICIAL_LEFT = 410;
const PREG_4_MOVE_POS_FINAL_LEFT = 740;

const PREG_5_MOVE_POS_INICIAL_TOP = 10;
const PREG_5_MOVE_POS_FINAL_TOP = 300;

const PREMIO_MOVE_POS_INICIAL_LEFT = 750;
const PREMIO_MOVE_POS_FINAL_LEFT = 1080;

const PUNTOS_PREG_CORRECTA = 10;
const PUNTOS_PREG_INCORRECTA = 5;

var totalPuntos = 0;
var esCorrecta = false;
var cerrado = false;
var buttonStartJuego;
var nombreUser;
var cookieGameDecisiones;

window.onload = function () {
    //var modalQuiz = document.getElementById("modalQuiz");
    //var pregunta = document.getElementById("pregunta");
    //var tituloPregunta = document.getElementById("tituloPregunta");
    //var spanCerrarModal = document.getElementsByClassName("close")[0];
    
    /*ANIMACIÓN BOTÓN*/

    //nombreUser = prompt("INTRODUCE TU NOMBRE PLZ", "");
    //crearCookie(nombre, nombreUser, 40);
    
    var animateButton = function(e)
    {
        e.preventDefault;
        //reset animation
        e.target.classList.remove('animate');
        
        e.target.classList.add('animate');
        setTimeout(function(){
        e.target.classList.remove('animate');
        },700);
    };
    
    buttonStartJuego = document.getElementById("buttonStartJuego");
    buttonStartJuego.addEventListener("click", function(event){
        moverObjeto(PREG_1_MOVE_POS_INCIAL_BOTTOM, PREG_1_MOVE_POS_FINAL_BOTTOM), animateButton;
    });
    /*var buttonResetJuego = document.getElementById("buttonResetJuego");
    buttonResetJuego.addEventListener("click", function(event){        
        resetObjeto(RESET_POS_INCIAL_BOTTOM, RESET_POS_INCIAL_LEFT);
    });*/    
    var bubblyButtons = document.getElementsByClassName("button-animation");
    
    for (var i = 0; i < bubblyButtons.length; i++)
    {
        bubblyButtons[i].addEventListener('click', animateButton, false);
    }
}

function moverObjeto(posicionInical, posicionFinal)
{
    buttonStartJuego.disabled = true;
    buttonStartJuego.style.background = '#484848';
    var pos = posicionInical;
    var id = setInterval(frame, VELOCIDAD_OBJETO);
    function frame() {
        if(posicionInical == PREG_1_MOVE_POS_INCIAL_BOTTOM)
        {
            if (pos == posicionFinal)
            {
                clearInterval(id);
                preguntaUno();
                resetObjeto('325px', '90px');
            }
            else
            {
                pos++; 
                userImage.style.bottom = pos + "px";     
            }   
        }
        
        if(posicionInical == PREG_2_MOVE_POS_INICIAL_LEFT)
        {
            if (pos == posicionFinal)
            {
            clearInterval(id);
            preguntaDos();
            resetObjeto('300px', '410px')
            }
            else
            {
            pos++; 
            userImage.style.left = pos + "px";     
            }
        }

        if(posicionInical == PREG_3_MOVE_POS_INICIAL_BOTTOM)
        {
            if (pos == posicionFinal)
            {
                clearInterval(id);
                preguntaTres();
                resetObjeto('640px', '410px');
            }
            else
            {
                pos++; 
                userImage.style.bottom = pos + "px";     
            }
        }

        if(posicionInical == PREG_4_MOVE_POS_INICIAL_LEFT)
        {
            if (pos == posicionFinal)
            {
            clearInterval(id);
            preguntaCuatro();
            resetObjeto('640px', '740px')
            }
            else
            {
            pos++; 
            userImage.style.left = pos + "px";     
            }
        }

        if(posicionInical == PREG_5_MOVE_POS_INICIAL_TOP)
        {
            if (pos == posicionFinal)
            {
                clearInterval(id);
                preguntaCinco();
                resetObjeto('300px', '750px');
            }
            else
            {
                pos++; 
                userImage.style.top = pos + "px";     
            }
        }

        if(posicionInical == PREMIO_MOVE_POS_INICIAL_LEFT)
        {
            if (pos == posicionFinal)
            {    
                clearInterval(id);
                //alert("HAS GANADO UN PIN, MIERDOSO")
                swal({
                    text: "¡GENIAL,  JUEGO COMPLETADO!",
                    icon: "img/icongold.png",
                    buttons:{
                        catch: {
                            text: "VER PUNTUACIÓN",
                            value: "catch",
                        },
                    },
                })
                .then((value) => {
                    switch(value){
                        case "catch":
                            swal({
                                text: "PUNTUACIÓN: " + totalPuntos,
                                icon: "img/iconpoints.png",
                                buttons:{
                                    catch: {
                                        text: "JUGAR OTRA VEZ",
                                        value: "catch",
                                    }
                                },
                            })
                            .then((value) => {
                                switch(value){
                                    case "catch":        
                                        window.location.reload(false);
                                        break;
                                }
                            });
                            break;
                    }
                }); 
            }
            else
            {
                pos++; 
                userImage.style.left = pos + "px";     
            }
        }
    }    
}

function resetObjeto(posBottom, posLeft)
{
    userImage.style.bottom = posBottom;
    userImage.style.left = posLeft;
}

/*FUNCIÓN QUE OBTIENE TODOS LOS INPUT RADIO*/
function getInputRadios()
{
    var allRadios = document.querySelectorAll('input[type="radio"]');
    return allRadios;
}

/*FUNCIÓN QUE RESETEA TODOS LOS INPUT RADIO*/
function resetearRadios(radios)
{
    for (var i = 0, l = radios.length; i < l; i++)
    {
        radios[i].checked = radios[i].defaultChecked;
    }
}

function preguntaUno()
{
    var radio = getInputRadios();
    resetearRadios(radio);
    mostrarModal();
    insertarTituloYPregunta("PRIMERA PREGUNTA", "¿Cómo se producen las ondas sonoras cuándo hablamos?");
    insertarOpciones("Por la posición del diafragma", "Por magia negra", RESP_CORRECT_PREGUNTA_1);
}

function preguntaDos()
{
    var radio = getInputRadios();
    resetearRadios(radio);
    mostrarModal();
    insertarTituloYPregunta("SEGUNDA PREGUNTA", "El tono de voz es la frecuencia de vibraciones por segundo ¿En que se mide dicha frecuencia?");
    insertarOpciones("HEINZ", RESP_CORRECT_PREGUNTA_2, "HERZ");
}

function preguntaTres()
{
    var radio = getInputRadios();
    resetearRadios(radio);
    mostrarModal();
    insertarTituloYPregunta("TERCERA PREGUNTA", "¿A través de dónde recibe el campo magnético la antena receptora?");
    insertarOpciones("DEL AGUA", RESP_CORRECT_PREGUNTA_3, "DE LA TIERRA");
}

function preguntaCuatro()
{
    var radio = getInputRadios();
    resetearRadios(radio);
    mostrarModal();
    insertarTituloYPregunta("CUARTA PREGUNTA", "¿Que dos formas existen de modular las ondas portadoras?");
    insertarOpciones("AM y FN", RESP_CORRECT_PREGUNTA_4, "FM y AN");
}

function preguntaCinco()
{
    var radio = getInputRadios();
    resetearRadios(radio);
    mostrarModal();
    insertarTituloYPregunta("QUINTA PREGUNTA", "Finalmente la antena amplia estás ondas moduladas y se propagan de una manera u otra, ¿según que factor?");
    insertarOpciones("SEGÚN SU LATITUD", "SEGÚN LA VELOCIDAD DEL VIENTO", RESP_CORRECT_PREGUNTA_5);
}

/*FUNCIÓN PARA INSERTAR EL TITULO Y LA PREGUNTA*/
function insertarTituloYPregunta(customTituloPregunta, customPregunta)
{
    tituloPregunta.innerHTML = customTituloPregunta;
    pregunta.innerHTML = customPregunta;
}

/*FUNCIÓN PARA INSERTAR LAS OPCIONES DE LA PREGUNTA*/
function insertarOpciones(opcion1, opcion2, opcion3)
{
    labelOpcion1.innerHTML = opcion1;
    labelOpcion2.innerHTML = opcion2;
    labelOpcion3.innerHTML = opcion3;
}

/*FUNCIÓN QUE MUESTRA EL MODAL*/
function mostrarModal()
{
    modalQuiz.style.display = "block";
}

/*FUNCIÓN PARA CERRAR EL MODAL*/
function cerrarModal()
{
    modalQuiz.style.display = "none";
}

function comprobarRespuesta()
{
   
    var inputs = getInputRadios();
    for(var i = 0; i<inputs.length; i++)
    {
        if(inputs[i].checked)
        {
            var selector = 'label[for=' + inputs[i].id + ']';
            var label = document.querySelector(selector);
            var texto = label.innerHTML;
            if(texto == RESP_CORRECT_PREGUNTA_1)
            {
                swal({
                    text: "¡Buen comienzo, continuemos!",
                    icon: "img/iconcorrect.png",
                    buttons:{
                        catch: {
                            text: "¡VAMOS!",
                            value: "catch",
                        },
                    },
                })
                .then((value) => {
                    switch(value){
                        case "catch":
                            cerrarModal();
                            moverObjeto(PREG_2_MOVE_POS_INICIAL_LEFT, PREG_2_MOVE_POS_FINAL_LEFT);
                            esCorrecta = true;
                            guardarPuntos(PUNTOS_PREG_CORRECTA);
                            break;
                    }
                });
            }
            
            else if(texto == RESP_CORRECT_PREGUNTA_2)
            {
                swal({
                    text: "¡10 puntitos más!",
                    icon: "img/iconcorrect.png",
                    buttons:{
                        catch: {
                            text: "¡RECOGER!",
                            value: "catch",
                        },
                    },
                })
                .then((value) => {
                    switch(value){
                        case "catch":
                            cerrarModal();
                            moverObjeto(PREG_3_MOVE_POS_INICIAL_BOTTOM, PREG_3_MOVE_POS_FINAL_BOTTOM);
                            esCorrecta = true;
                            guardarPuntos(PUNTOS_PREG_CORRECTA);
                            break;
                    }
                });   
            }
            else if(texto == RESP_CORRECT_PREGUNTA_3)
            {
                swal({
                    text: "¡VEO QUE ALGUIEN ESTÁ ON FIRE!",
                    icon: "img/iconcorrect.png",
                    buttons:{
                        catch: {
                            text: "¡SIGAMOS!",
                            value: "catch",
                        },
                    },
                })
                .then((value) => {
                    switch(value){
                        case "catch":
                            cerrarModal();
                            moverObjeto(PREG_4_MOVE_POS_INICIAL_LEFT, PREG_4_MOVE_POS_FINAL_LEFT);
                            esCorrecta = true;
                            guardarPuntos(PUNTOS_PREG_CORRECTA);
                            break;
                    }
                });   
            }
            else if(texto == RESP_CORRECT_PREGUNTA_4)
            {
                swal({
                    text: "THE LAST ONE!",
                    icon: "img/iconcorrect.png",
                    buttons:{
                        catch: {
                            text: "¡VAMOS!",
                            value: "catch",
                        },
                    },
                })
                .then((value) => {
                    switch(value){
                        case "catch":
                            cerrarModal();
                            moverObjeto(PREG_5_MOVE_POS_INICIAL_TOP, PREG_5_MOVE_POS_FINAL_TOP);
                            esCorrecta = true;
                            guardarPuntos(PUNTOS_PREG_CORRECTA);
                            break;
                    }
                });
            }
            else if(texto == RESP_CORRECT_PREGUNTA_5)
            {
                swal({
                    text: "CARGANDO PREMIO...",
                    icon: "img/premio.png",
                    buttons:{
                        catch: {
                            text: "¡RECOGER!",
                            value: "catch",
                        },
                    },
                })
                .then((value) => {
                    switch(value){
                        case "catch":
                            cerrarModal();
                            moverObjeto(PREMIO_MOVE_POS_INICIAL_LEFT, PREMIO_MOVE_POS_FINAL_LEFT);
                            esCorrecta = true;
                            guardarPuntos(PUNTOS_PREG_CORRECTA);
                            break;
                    }
                });
            }
            else
            {            
                esCorrecta = false;
                guardarPuntos(PUNTOS_PREG_INCORRECTA);
                swal({
                    text: "¡INCORRECTO!",
                    icon: "img/error.png",
                    buttons: "Volver a intentar"    
                });  
            }
        }            
    }   
}

function guardarPuntos(puntos)
{        
    if(esCorrecta)
    {
        totalPuntos = totalPuntos + puntos;
        elementPuntos.innerHTML = "Puntos: " + totalPuntos;
    }
    else
    {
        totalPuntos = totalPuntos - puntos;
        elementPuntos.innerHTML = "Puntos: " + totalPuntos;
    }    
}

function mostrarSweetAlert()
{
    swal({
        text: "¡Genial, sigamos avanzando!",
        icon: "img/premio.png",
        buttons:{
            catch: {
                text: "GO",
                value: "catch",
            },
        },
    })
    .then((value) => {
        switch(value){
            case "catch":
                cerrado = true;
                alert("adss");
                break;
        }
    }); 
}

function reiniciarJuego()
{
    window.location.href = 'gameDecisiones.html';
}