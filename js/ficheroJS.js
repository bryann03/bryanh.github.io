window.onload = function()
{
  var buttonAboutUs = document.getElementsByClassName("buttonAboutUs");
  
var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("button-animation");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }
}

function mostrarAviso()
{
  swal({
    text: "¡Estamos trabajando en ello!",
    icon: "img/iconoworks.png",
    buttons: "Cerrar"
  });
}
