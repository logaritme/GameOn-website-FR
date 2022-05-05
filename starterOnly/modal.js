function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalContent = document.getElementById('modal-content');
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Open/Launch modal event.
modalBtn.forEach((clickBtnLaunch) =>
  clickBtnLaunch.addEventListener('click', launchModal)
);

// launch modal form
function launchModal() {
  modalContent.style.display = "block";
}

// Open modal form.
function launchModal() {
  modalContent.style.display = 'block';
}

// Below, close the first modal through the cross.
function closeCrossModal() {
  modalContent.style.display = 'none';
}
