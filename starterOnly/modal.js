function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// Variable subscribeForm based on the DOM that I will listen event for each submitting form
const subscribeForm = document.getElementById('form-subscribe-tournament');
subscribeForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

// DOM Elements
const modalContent = document.getElementById('modal-content');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const btnSubmit = document.querySelectorAll('.btn-submit');

// Open/Launch modal event.
modalBtn.forEach((clickBtnLaunch) =>
  clickBtnLaunch.addEventListener('click', launchModal)
);

// launch modal form.
function launchModal() {
  modalContent.style.display = 'block';
}

// Below, variable for all the input fields.
const inputsInFields = document.querySelectorAll(
  'input[type="text"], input[type="email"], input[type="date"], input[type="number"]'
);

// Below, variables for all the fx filtered by regex.
let firstName, lastName, email, birthDate, quantity;
// Below, variables for the "final" validation fx.
let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isBirthDateValid = false;
let isQuantityValid = false;

// Below, get values of checkboxes, location, by name.
const theLocationsList = [
  ...document.querySelectorAll('input[name="location"]'),
];

const theLocationVariable = document.querySelectorAll(
  'input[id="location1"], input[id="location2"], input[id="location3"], input[id="location4"], input[id="location5"], input[id="location6"]'
);

// Below, variable to store an array exploited later on length === 0 or !== 0 .
let arrayLocationVariable = [];
// Below, set variable to approve validity of location checked.
let isOneLocationValid;
// Below, get value of the checkbox, terms of use, by id.
const checkBoxTermsOfUseStatic = document.querySelectorAll(
  'input[id="checkbox1"]'
);

// Below, set variable to approve validity of terms of use.
let isTermsOfUseValid;

// Below, close modal events.
btnSubmit.forEach((clickBtnCloseIf) =>
  clickBtnCloseIf.addEventListener('click', closeModal)
);

// Below, "closeModal" close modal form through the button.
function closeModal() {
  isLocationValid();
  isCheckBoxTermsOfUseValid();
  if (areAllBooleansValid()) {
    modalContent.style.display = 'none';
  } else {
    modalContent.style.display = 'block';
  }
}

// First name : Fx that filters the length and the validity of the first name typed.
function firstNameChecker(value) {
  // Si la longueur est non valide
  if ((value.length > 0 && value.length < 2) || value.length > 33) {
    firstName = null;
    isFirstNameValid = false;
    areAllBooleansValid();
  }
  // Si les caractères sont non valides
  // REGEX alternative [\p{L}- ]
  else if (!value.match(/^[a-zA-ZÀ-ÿ-' ]*$/g)) {
    firstName = null;
    isFirstNameValid = false;
    areAllBooleansValid();
  } else {
    firstName = value;
    isFirstNameValid = true;
    areAllBooleansValid();
  }
}

// Last name : Fx that filters the length and the validity of the last name typed.
// Lire la doc sur ça et le tester -> ( J'aurais pu utiliser .test au lieu de .match ? )
const lastNameChecker = (value) => {
  // Si la longueur est non valide
  if ((value.length > 0 && value.length < 2) || value.length > 33) {
    lastName = null;
    isLastNameValid = false;
    areAllBooleansValid();
  }
  // Si les caractères sont non valides
  // REGEX alternative [\p{L}- ]
  else if (!value.match(/^[a-zA-ZÀ-ÿ-' ]*$/g)) {
    lastName = null;
    isLastNameValid = false;
    areAllBooleansValid();
  } else {
    lastName = value;
    isLastNameValid = true;
    areAllBooleansValid();
  }
};

// Email : Fx that filters the length and the validity of the email typed.
const emailChecker = (value) => {
  // Si la longueur est non valide
  if ((value.length > 0 && value.length < 6) || value.length > 33) {
    email = null;
    isEmailValid = false;
    areAllBooleansValid();
  }
  // Si les caractères sont non valides
  // REGEX alternatives [\p{L}-_. @] ou (/^([\w-\.]+)@([\w-]+)\.([\w-]{2,4})$/)
  else if (
    value.length > 0 &&
    !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  ) {
    email = null;
    isEmailValid = false;
    areAllBooleansValid();
  } else {
    email = value;
    isEmailValid = true;
    areAllBooleansValid();
  }
};

// Date : Fx that filters the length and the validity of the date selected/typed.
const birthDateChecker = (value) => {
  // Si la longueur est non valide
  if (value.length > 0 && value.length !== 10) {
    birthDate = null;
    isBirthDateValid = false;
    areAllBooleansValid();
  }
  // Si les chiffres sont non valides
  // *Faire un check de date dynamique en fonction de la date actuelle*
  else if (
    !value.match(
      /(^(19[0-9]{2}|200[0-9])[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$)/
    )
  ) {
    birthDate = null;
    isBirthDateValid = false;
    areAllBooleansValid();
  } else {
    birthDate = value;
    isBirthDateValid = true;
    areAllBooleansValid();
  }
};

// Quantity :Fx that filters the length and the validity of the number selected/typed.
const quantityChecker = (value) => {
  // Si la longueur est non valide
  if (
    value.length === null ||
    value.length > 2 ||
    !value.match(/(^[0-9]?[0-9]?[0-9]?[0-9]$)/)
  ) {
    quantity = null;
    isQuantityValid = false;
    areAllBooleansValid();
  } else {
    quantity = value;
    isQuantityValid = true;
    areAllBooleansValid();
  }
};

// Fx managing retrieved objects
// and returning true or false in the arrayLocationVariable
// to valide or invalide the closing of the modal.
theLocationVariable.forEach((check) => {
  check.addEventListener('input', (element) => {
    switch (element.target.id) {
      case 'location1':
        arrayLocationVariable.push(element.target.checked);
        isLocationValid();
        break;
      case 'location2':
        arrayLocationVariable.push(element.target.checked);
        isLocationValid();
        break;
      case 'location3':
        arrayLocationVariable.push(element.target.checked);
        isLocationValid();
        break;
      case 'location4':
        arrayLocationVariable.push(element.target.checked);
        isLocationValid();
        break;
      case 'location5':
        arrayLocationVariable.push(element.target.checked);
        isLocationValid();
        break;
      case 'location6':
        arrayLocationVariable.push(element.target.checked);
        isLocationValid();
        break;
      default:
        return 'error';
    }
  });
});

// Fx managing the tournament cities ( forward to fx: global form validation )
function isLocationValid() {
  if (
    theLocationsList.filter((location) => location.checked).length === 0 ||
    theLocationVariable.length === 0
  ) {
    isOneLocationValid = false;
    areAllBooleansValid();
  } else if (theLocationVariable.length !== 0) {
    isOneLocationValid = true;
    areAllBooleansValid();
  } else {
    return error();
  }
}

// Fx manging the values get for each field text typed by the user
// Get values of inputs ( text + text + email + birthdate + quantity) by switch on each ids
inputsInFields.forEach((input) => {
  input.addEventListener('input', (element) => {
    switch (element.target.id) {
      case 'firstName':
        firstNameChecker(element.target.value);
        break;
      case 'lastName':
        lastNameChecker(element.target.value);
        break;
      case 'email':
        emailChecker(element.target.value);
        break;
      case 'birthDate':
        birthDateChecker(element.target.value);
        break;
      case 'quantity':
        quantityChecker(element.target.value);
        break;
      default:
        return 'error';
    }
  });
});

// Declare fx isCheckBoxTermsOfUseValid ( used in closeModal()) ( forward to fx: global form validation )
function isCheckBoxTermsOfUseValid() {
  // Below, get value of checkbox, term of use, by name
  const checkBoxTermOfUseList = [
    ...document.querySelectorAll('input[id="checkbox1"]'),
  ];
  const checkBoxTermsOfUseDynamic = document.querySelector(
    'input[id="checkbox1"]:checked'
  );
  // checkBoxTermsOfUseStatic.length est tout le temps undefined, pourquoi?
  if (
    checkBoxTermsOfUseDynamic === null &&
    checkBoxTermOfUseList.filter((term) => term.checked).length === 0
  ) {
    isTermsOfUseValid = false;
    areAllBooleansValid();
  } else if (
    checkBoxTermsOfUseDynamic !== null &&
    checkBoxTermOfUseList.filter((term) => term.checked).length !== 0
  ) {
    isTermsOfUseValid = true;
    areAllBooleansValid();
  } else {
    return error();
  }
}

// Listener for checkbox GCU on method 'input'
checkBoxTermsOfUseStatic.forEach((checkTerm) => {
  checkTerm.addEventListener('input', function () {
    if (this.checked) {
      isTermsOfUseValid = true;
    } else {
      isTermsOfUseValid = false;
    }
  });
});

// Final Fx fléchée areAllBooleansValid() to close the first modal.
// const areAllBooleansValid = () => {
//   console.log('Ca rentre dans ma fonction areAllBooleansValid !');
//   return (
//     firstName !== null &&
//     isFirstNameValid !== false &&
//     lastName !== null &&
//     isLastNameValid !== false &&
//     email !== null &&
//     isEmailValid !== false &&
//     birthDate !== null &&
//     isBirthDateValid !== false &&
//     quantity !== null &&
//     isQuantityValid !== false &&
//     isOneLocationValid !== false &&
//     isTermsOfUseValid !== false
//   );
// };

// Below, doublon: Fx areAllBooleansValid() déclarée
function areAllBooleansValid() {
  console.log('Ca rentre dans ma fonction pas fléchée areAllBooleansValid !');
  return (
    firstName !== null &&
    isFirstNameValid !== false &&
    lastName !== null &&
    isLastNameValid !== false &&
    email !== null &&
    isEmailValid !== false &&
    birthDate !== null &&
    isBirthDateValid !== false &&
    quantity !== null &&
    isQuantityValid !== false &&
    isOneLocationValid !== false &&
    isTermsOfUseValid !== false
  );
}

// Below, close the first modal through the cross.
function closeCrossModal() {
  modalContent.style.display = 'none';
}
