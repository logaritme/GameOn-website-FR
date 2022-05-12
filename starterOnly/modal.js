// Listener on the DOM, on form id="form-subscribe-tournament", when action is submitting the form
document
  .getElementById('form-subscribe-tournament')
  .addEventListener('submit', (event) => {
    event.preventDefault();
  });

// Handles the responsive in CSS
function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// Catchs DOM elements to variables
const modalContent = document.getElementById('modal-content');
const modalBtn = document.querySelectorAll('.modal-btn');
const btnReset = document.getElementById('btn-modal-thank-you');
const secondModal = document.getElementById('modal-subscribe-thank-you');

// Open/Launch modal event
modalBtn.forEach((clickBtnLaunch) =>
  clickBtnLaunch.addEventListener('click', launchModal)
);

// Open modal form
function launchModal() {
  modalContent.style.display = 'block';
}

// Close modal events
document
  .querySelectorAll('.btn-submit')
  .forEach((clickBtnCross) =>
    clickBtnCross.addEventListener('click', closeModal)
  );

// Get values of checkboxes location, by name
const theLocationsList = Array.from(
  document.querySelectorAll('input[name="location"]'),
  (value) => value
);

// Get values for length of checkboxes location, by iteration on ids
const toBuildTheLocationVariable = [1, 2, 3, 4, 5, 6]
  .map((value) => `input[id="location${value}"]`)
  .join(', ');

const theLocationVariable = document.querySelectorAll(
  toBuildTheLocationVariable
);
// Stores an array exploited later on length === 0 or !== 0
let arrayLocationVariable = [];
// Sets variable to approve validity of location checked
let isOneLocationValid;
// Gets value of the checkbox, terms of use, by id
const checkBoxTermsOfUseStatic = document.querySelectorAll(
  'input[id="checkbox1"]'
);

// Sets variable to approve validity of terms of use
let isTermsOfUseValid;

// Close modal form by button
function closeModal() {
  const firstNameForLength = document.getElementById('firstName');
  const lastNameForLength = document.getElementById('lastName');
  const eMailForLength = document.getElementById('email');
  const birthDateForLength = document.getElementById('birthDate');
  const quantityTournamentForLength = document.getElementById('quantity');

  function displayErrorMsgFirstName() {
    if (firstNameForLength.value.length === 0) {
      errorDisplay(
        'firstName',
        'Le prénom doit faire entre 2 et 33 caractères.',
        false
      );
    }
  }

  function displayErrorMsgLastName() {
    if (lastNameForLength.value.length === 0) {
      errorDisplay(
        'lastName',
        'Le nom doit faire entre 2 et 33 caractères.',
        false
      );
    }
  }

  function displayErrorMsgEmail() {
    if (eMailForLength.value.length === 0) {
      errorDisplay(
        'email',
        "L'email doit faire entre 6 et 33 caractères.",
        false
      );
    }
  }

  function displayErrorMsgBirthDate() {
    if (birthDateForLength.value.length === 0) {
      errorDisplay('birthDate', "Cette date n'est pas valide.", false);
    }
  }

  function displayErrorMsgQuantity() {
    if (quantityTournamentForLength.value.length === 0) {
      errorDisplay('quantity', "Cette valeur n'est pas valide.", false);
    }
  }

  function allErrorsChecked() {
    displayErrorMsgFirstName();
    displayErrorMsgLastName();
    displayErrorMsgEmail();
    displayErrorMsgBirthDate();
    displayErrorMsgQuantity();
    isLocationValid();
    isCheckBoxTermsOfUseValid();
  }

  allErrorsChecked();
  if (areAllBooleansValid()) {
    modalContent.style.display = 'none';
    secondModal.style.display = 'block';
  } else {
    modalContent.style.display = 'block';
    secondModal.style.display = 'none';
  }
}

// Gets values of inputs ( text + text + email ) by type
const inputsInFields = document.querySelectorAll(
  'input[type="text"], input[type="email"], input[type="date"], input[type="number"]'
);

// Variables declared for all the functions filtered by regex
let firstName, lastName, email, birthDate, quantity;
// Variables for the "final" validation function.
let isFirstNameValid = false;
let isLastNameValid = false;
let isEmailValid = false;
let isBirthDateValid = false;
let isQuantityValid = false;

/* Manages all error messages displayed
   through a text displaying in the appropriated div */
const errorDisplay = (tag, message, valid) => {
  const textContainer = document.querySelector(`.${tag}`);
  const errorDisplayDiv = document.querySelector(`.${tag} > div`);
  if (!valid) {
    textContainer.classList.add('errorDiv');
    errorDisplayDiv.textContent = message;
  } else {
    textContainer.classList.remove('errorDiv');
    errorDisplayDiv.textContent = message;
  }
};

// First name : Filters the length and the validity of the first name typed
function firstNameChecker(value) {
  // If length is not valid
  if ((value.length > 0 && value.length < 2) || value.length > 33) {
    errorDisplay(
      'firstName',
      'Le prénom doit faire entre 2 et 33 caractères.',
      false
    );
    firstName = null;
    isFirstNameValid = false;
    areAllBooleansValid();
  }
  // If caracters are not valid
  else if (!value.match(/^(?! \s)[a-zA-ZÀ-ÿ-' ]*$/g)) {
    errorDisplay(
      'firstName',
      'Le prénom ne doit contenir ni caractères spéciaux ni chiffres.',
      false
    );
    firstName = null;
    isFirstNameValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('firstName', '', true);
    firstName = value;
    isFirstNameValid = true;
    areAllBooleansValid();
  }
}

// Last name : Filters the length and the validity of the last name typed
const lastNameChecker = (value) => {
  // If length is not valid
  if ((value.length > 0 && value.length < 2) || value.length > 33) {
    errorDisplay(
      'lastName',
      'Le nom doit faire entre 2 et 33 caractères.',
      false
    );
    lastName = null;
    isLastNameValid = false;
    areAllBooleansValid();
  }
  // If caracters are not valid
  else if (!value.match(/^(?! \s)[a-zA-ZÀ-ÿ-' ]*$/g)) {
    errorDisplay(
      'lastName',
      'Le nom ne doit contenir ni caractères spéciaux ni chiffres.',
      false
    );
    lastName = null;
    isLastNameValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('lastName', '', true);
    lastName = value;
    isLastNameValid = true;
    areAllBooleansValid();
  }
};

// Email : Filters the length and the validity of the email typed
const emailChecker = (value) => {
  // If length is not valid
  if ((value.length > 0 && value.length < 6) || value.length > 33) {
    errorDisplay(
      'email',
      "L'email doit faire entre 6 et 33 caractères.",
      false
    );
    email = null;
    isEmailValid = false;
    areAllBooleansValid();
  }
  // If caracters are not valid
  else if (
    value.length > 0 &&
    !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  ) {
    errorDisplay('email', 'Ce champ doit être valide au format email.', false);
    email = null;
    isEmailValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('email', '', true);
    email = value;
    isEmailValid = true;
    areAllBooleansValid();
  }
};

// Date : Filters the length and the validity of the date selected/typed
const birthDateChecker = (value) => {
  // If length is not valid
  if (value.length > 0 && value.length !== 10) {
    errorDisplay(
      'birthDate',
      'La date doit être conforme à jj/mm/aaaa.',
      false
    );
    birthDate = null;
    isBirthDateValid = false;
    areAllBooleansValid();
  }
  // If numbers are not valid
  else if (
    !value.match(
      /^((0[1-9]|1\d|2[0-8])[\/\-](0\d|1[012])[\/\-](1[6-9]|[2-9]\d)\d{2}|(29|30)[\/\-](0[13-9]|1[012])[\/\-](1[6-9]|[2-9]\d)\d{2}|31[\/\-](0[13578]|1[02])[\/\-](1[6-9]|[2-9]\d)\d{2}|29[\/\-]02[\/\-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(16|[2468][048]|[3579][26])00))$/
    ) &&
    !value.match(
      /(^(19[0-9]{2}|200[0-9])[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$)/
    )
  ) {
    errorDisplay('birthDate', "Cette date n'est pas valide.", false);
    birthDate = null;
    isBirthDateValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('birthDate', '', true);
    birthDate = value;
    isBirthDateValid = true;
    areAllBooleansValid();
  }
};

// Quantity :Filters the length and the validity of the number selected/typed
const quantityChecker = (value) => {
  // If length is not valid
  if (
    value.length === null ||
    value.length > 2 ||
    !value.match(/(^[0-9]?[0-9]?[0-9]?[0-9]$)/)
  ) {
    errorDisplay('quantity', "Cette valeur n'est pas valide.", false);
    quantity = null;
    isQuantityValid = false;
    areAllBooleansValid();
  } else {
    errorDisplay('quantity', '', true);
    quantity = value;
    isQuantityValid = true;
    areAllBooleansValid();
  }
};

/* Retrieve objects and returning true or false
   in the arrayLocationVariable
   to valide or invalide the closing of the modal */
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

// Manages the tournament cities ( forward to functions: allErrorsChecked() in closeModal() )
function isLocationValid() {
  if (
    theLocationsList.filter((location) => location.checked).length === 0 ||
    theLocationVariable.length === 0
  ) {
    isOneLocationValid = false;
    errorDisplay('locations', 'Une ville doit être cochée.', false);
    areAllBooleansValid();
  } else if (theLocationVariable.length !== 0) {
    isOneLocationValid = true;
    errorDisplay('locations', '', true);
    areAllBooleansValid();
  } else {
    return error();
  }
}

/* Manages the values obtained for each field text typed by the user,
   getting the values of inputs ( text + text + email + birthdate + quantity) by switch on each id */
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

// Declares function ( forward to functions: allErrorsChecked() in closeModal() )
function isCheckBoxTermsOfUseValid() {
  // Below, get value of checkbox, term of use, by name
  const checkBoxTermOfUseList = [
    ...document.querySelectorAll('input[id="checkbox1"]'),
  ];
  const checkBoxTermsOfUseDynamic = document.querySelector(
    'input[id="checkbox1"]:checked'
  );
  if (
    checkBoxTermsOfUseDynamic === null &&
    checkBoxTermOfUseList.filter((term) => term.checked).length === 0
  ) {
    isTermsOfUseValid = false;
    errorDisplay('terms', "Acceptez les conditions d'utilisations.", false);
    areAllBooleansValid();
  } else if (
    checkBoxTermsOfUseDynamic !== null &&
    checkBoxTermOfUseList.filter((term) => term.checked).length !== 0
  ) {
    isTermsOfUseValid = true;
    errorDisplay('terms', '', true);
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
      errorDisplay('terms', '', true);
    } else {
      isTermsOfUseValid = false;
      errorDisplay(
        'terms',
        "Les conditions d'utilisations doivent être acceptées.",
        false
      );
    }
  });
});

// Function used later to close the form subscribe modal on valid filled form
const areAllBooleansValid = () => {
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
};

// Close the form subscribe modal through the cross
function closeCrossModal() {
  modalContent.style.display = 'none';
  secondModal.style.display = 'none';
}

// Closes the modal thanks when you click on the cross
document
  .getElementById('close-modal-thank-you')
  .addEventListener('click', closeModalThankYou);

// Closes the modal thanks when you click on the button "Fermer"
btnReset.addEventListener('click', closeModalThankYou);

function closeModalThankYou() {
  secondModal.style.display = 'none';
}
