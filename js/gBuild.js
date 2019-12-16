const fill = document.querySelector('.fill');

const vacios = document.querySelectorAll('.empty');

//Fill listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

//loop los vacios y llamar los drag events

for (const empty of vacios) {
  //cuando paso por encima de una caja
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

//drag functions
function dragStart() {
  //console.log('start');

  //añado la clase hold al objeto actual
  this.className += ' hold';
  //settimeout es usado para que la clase se convierta en 'invisible' justo antes de mover el objeto
  setTimeout(() => (this.className = 'invisible'), 0);
}
function dragEnd() {
  //console.log('end');

  //al soltar, vuelvo a decir que el objeto cae
  this.className = 'fill';
}

function dragOver(e) {
  //console.log('over');

  //evitamos el comportamiento normal por que impide el drop
  e.preventDefault();
}

function dragEnter(e) {
  //console.log('enter');

  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  //console.log('leave');

  this.className = 'empty';
}

function dragDrop() {
  //console.log('drop');
  this.className = 'empty';
  this.append(fill);
}
