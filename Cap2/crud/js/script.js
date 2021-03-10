window.addEventListener('load', start);

//VARIAVEIS GLOBAIS

var globalNames = ['Rafael', 'Michel', 'Elaine', 'Leonardo', 'Thamiris'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

//FUNÇÃO START INICIALIZANDO TUDO AO CARREGAR A PÁGINA

function start() {
  inputName = document.querySelector('#inputName');
  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  //INSERT
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }
  //UPDATE
  function updateName(newName) {
    globalNames[currentIndex] = newName;
    render();
  }

  //LÓGICA PARA SABER SE ESTA EDITANDO OU INSERINDO  validando espação em brando com trim()

  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      isEditing = false;
      clearInput();
    }
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    //DELETE
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    //CRIAÇÃO DO BOTÃO DELETE
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  //CRIAÇÃO DA SPAN PARA CRIAR UMA LISTA ORDENADA DINAMICA

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = currentName;
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  //criar ul
  //fazer n li's conforme tamanho do vetor globalnames

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
