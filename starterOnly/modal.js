function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// "subscribeForm" est une variable basée sur le DOM dont je vais écouter l'évènement à chaque soumission du formulaire
const subscribeForm = document.getElementById('form-subscribe-tournament');
subscribeForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const btnSubmit = document.querySelectorAll('.btn-submit');
const closeByCross = document.querySelectorAll('.btn-close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// Close modal event by submit and by cross
btnSubmit.forEach((clickBtnSubmit) =>
  clickBtnSubmit.addEventListener('click', closeModal)
);

closeByCross.forEach((clickBtnCross) =>
  clickBtnCross.addEventListener('click', closeModal)
);

function closeCrossModal() {
  modalContent.style.display = 'none';
}
