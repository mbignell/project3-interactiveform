// Sets up form elements as referencable objects
// adds submission call, clears action
// initiates validationErrors
const form = document.getElementsByTagName('form')[0];
const pageContainer = document.getElementsByClassName('container')[0];
form.setAttribute("onsubmit", "return submitForm()");
form.setAttribute("action", "");
let validationErrors = 0;

const errorMessages = {
  'name': 'Please add your name.',
  'email': 'Please add your email.',
  'jobOther': 'Please enter your job role.',
  'shirt': 'Please select a shirt design.',
  'activities': 'You must select at least one activity.',
  'ccnumber': 'Please enter your credit card number.',
  'cczipcode': 'Please enter a valid ZIP code.',
  'cvv': 'Please enter a valid CVV.'
}

// Builds an error message using the string passed through.
// If it's for name, email, or the other field, places it within the input.
// Else, places it after.
function createError(input) {
  validationErrors += 1;
  let errorParent = eval(input);
  let error = document.createElement('div');
  error.classList.add('form-error-' + input);
  error.textContent = errorMessages[input];
  if (input === 'name' || input === 'email' || input === 'jobOther') {
    errorParent.parentNode.insertBefore(error, errorParent);
  } else {
    errorParent.parentNode.insertBefore(error, errorParent.nextSibling);
  };
  errorParent.classList.add("error");
}
// Removes any existing errors before re-validating
function removeExistingErrors(classname) {
  let feedbackError = document.getElementsByClassName(classname);
  if (feedbackError.length > 0) {
    feedbackError[0].parentNode.removeChild(feedbackError[0]);
  };
}

/*
*  #1 -- NAME
*  Adds javascript for email field validation
*/
const name = document.getElementById('name');
name.setAttribute("onfocusout", "validateName()");
function validateName() {
  let nameValue = name.value;
  removeExistingErrors('form-error-name');
  if (nameValue === '') {
    createError('name');
  } else {
    name.classList.remove("error");
  };
};

/*
*  #2 -- EMAIL
*  Adds javascript for email field validation
*/
const email = document.getElementById('mail');
email.setAttribute("onkeyup", "validateEmail()");
email.setAttribute("onfocusout", "validateEmail()");
function validateEmail() {
  let emailValue = email.value;
  const testterms = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  removeExistingErrors('form-error-email');
  if (testterms.test(emailValue)) {
    email.classList.remove("error");
  } else if (emailValue === ''){
    errorMessages.email = 'Please enter an email.';
    createError('email');
  } else {
    errorMessages.email = 'Please enter a valid email.';
    createError('email');
  };
};

/*
*  #3 -- JOB ROLE
*/
// Adds javascript to job selection dropdown and collects necessary objects
const otherFieldContainer = document.getElementById('job-other-container');
const jobOther = document.getElementById('other-job');
jobOther.setAttribute("onfocusout", "validateJobRole()");
jobOther.setAttribute("onkeypress", "validateJobRole()");
const jobFields = document.getElementById('title');
jobFields.setAttribute("onchange", "onJobSelection()");

// Helper functions to hide and show "other" field
const hideJobOtherField = () => otherFieldContainer.style.display = "none";
const showJobOtherField = () => otherFieldContainer.style.display = "block";

// Make "other" field appear if "other is selected"
function onJobSelection() {
  const selectedJobValue = jobFields.options[jobFields.selectedIndex].value;
  if (selectedJobValue === "other") {
    showJobOtherField();
  } else {
    hideJobOtherField();
    jobOther.classList.remove("error");
  }
};

// If "other" is selected, make sure they've added a job role
function validateJobRole() {
  removeExistingErrors('form-error-jobOther');
  const finalJobValue = jobFields.options[jobFields.selectedIndex].value;
  if (finalJobValue === "other" && jobOther.value === '') {
    createError('jobOther')
  } else {
    jobOther.classList.remove("error");
  }
};

/*
  #4 -- SHIRT CHOICE
*/
// Adds javascript action for shirt choice
const shirt = document.getElementById('design');
shirt.setAttribute("onchange", "onShirtDesignSelection()");

// Helpers for hiding or showing shirt colors
const shirtColor = document.getElementById('colors-js-puns');
const hideShirtColors = () => shirtColor.style.display = "none";
const showShirtColors = () => shirtColor.style.display = "block";
const shirtTitle = document.getElementsByClassName('shirt')[0].nextSibling;

// When design is selected, show relevant color choices
function onShirtDesignSelection() {
  const selectedDesignIndex = shirt.selectedIndex;
  const colorChoices = document.getElementById('color');
  let colorChoicesHTML;
  if (selectedDesignIndex === 0) {
    hideShirtColors();
  } else if (selectedDesignIndex === 1) {
    showShirtColors();
    colorChoicesHTML = '<option value="cornflowerblue">Cornflower Blue</option>' +
    '<option value="darkslategrey">Dark Slate Grey</option>' +
    '<option value="gold">Gold</option>';
  } else if (selectedDesignIndex === 2) {
    showShirtColors();
    colorChoicesHTML = '<option value="tomato">Tomato</option>' +
    '<option value="steelblue">Steel Blue</option>' +
    '<option value="dimgrey">Dim Grey</option>';
  }
  colorChoices.innerHTML = colorChoicesHTML;
};

function validateShirt() {
  removeExistingErrors('form-error-shirt');
  const selectedDesignIndex = shirt.selectedIndex;
  if (selectedDesignIndex === 0) {
    createError('shirt');
  };
};

/*
  #5 -- ACTIVITIES
*/
// Adds javascript action for activity selection
const activityFieldSet = document.getElementsByClassName('activities')[0];
const activityCheckboxes = activityFieldSet.getElementsByTagName('input');
for(let i=0; i< activityCheckboxes.length; i++) {
  activityCheckboxes[i].setAttribute("onchange", `onActivitySelection(this,${i})`);
};
const activities = activityFieldSet.getElementsByTagName('legend')[0];

// initiates cost at 0
let costTotal = 0;

// If a checkbox is changed, this function runs and
//  -- adds to the costTotal and prints it at the end
//  -- disables any conflicting activities
//  -- runs validation
function onActivitySelection(element,index) {
  let selectionValue = index;
  let selectionIsChecked = element.checked;

  if (selectionValue === 0 && selectionIsChecked) {
    costTotal += 200;
  } else if (selectionValue === 0 && !selectionIsChecked) {
    costTotal -= 200;
  } else if (selectionValue > 0 && selectionIsChecked) {
    costTotal += 100;
  } else if (selectionValue > 0 && !selectionIsChecked) {
    costTotal -= 100;
  };

  if (selectionValue === 1 && selectionIsChecked) {
    activityCheckboxes[3].disabled = true;
  } else if (selectionValue === 1 && !selectionIsChecked) {
    activityCheckboxes[3].disabled = false;
  }
  if (selectionValue === 3 && selectionIsChecked) {
    activityCheckboxes[1].disabled = true;
  } else if (selectionValue === 3 && !selectionIsChecked) {
    activityCheckboxes[1].disabled = false;
  }
  if (selectionValue === 2 && selectionIsChecked) {
    activityCheckboxes[4].disabled = true;
  } else if (selectionValue === 2 && !selectionIsChecked) {
    activityCheckboxes[4].disabled = false;
  }
  if (selectionValue === 4 && selectionIsChecked) {
    activityCheckboxes[2].disabled = true;
  } else if (selectionValue === 4 && !selectionIsChecked) {
    activityCheckboxes[2].disabled = false;
  }
  setCostTotal();
  validateActivities();
};

function setCostTotal() {
  let selectionTotalDiv = document.getElementById('total_value');
  if (costTotal > 0) {
    selectionTotalDiv.innerHTML = `Your total: $${costTotal}`;
  } else {
    selectionTotalDiv.innerHTML = "";
  };
};

// Makes sure at least one activity is selected
function validateActivities() {
  removeExistingErrors('form-error-activities');
  if (costTotal === 0) {
    createError('activities');
  };
};

/*
  #6 -- PAYMENT
*/
// Adds javascript action for payment choice
const paymentChoice = document.getElementById('payment');
paymentChoice.setAttribute("onchange", "onPaymentSelection()");

// Collect divs of payment information
const creditCardInfo = document.getElementById('credit-card');
const bitcoinInfo = document.getElementById('bitcoin-info');
const paypalInfo = document.getElementById('paypal-info');

// Helper functions to show correct information
const showCreditCardInfo = () => creditCardInfo.style.display = "block";
const showBitcoinInfo = () => bitcoinInfo.style.display = "block";
const showPaypalInfo = () => paypalInfo.style.display = "block";

// hide all payment types
const hideAllPaymentInfo = () => {
  creditCardInfo.style.display = "none";
  bitcoinInfo.style.display = "none";
  paypalInfo.style.display = "none";
}

const paymentChoiceSelection = {
  select_method: () => {
    hideAllPaymentInfo();
  },
  credit_card: () => {
    hideAllPaymentInfo();
    showCreditCardInfo();
  },
  paypal: () => {
    hideAllPaymentInfo();
    showPaypalInfo();
  },
  bitcoin: () => {
    hideAllPaymentInfo();
    showBitcoinInfo();
  }
}

// On payment choice, show the relevant divs of information and hide the rest.
// If nothing is selected, hide all options.
function onPaymentSelection() {
  let selectedPayment = paymentChoice.options[paymentChoice.selectedIndex].value;
  paymentChoiceSelection[selectedPayment]();
};

// Helper function to test if a string is all numbers (credit card validation)
const isANumber = (str) => { return !/\D/.test(str); }

// Credit Card Number Validation
const ccnumber = document.getElementById('cc-num');
ccnumber.setAttribute("onkeyup", "validateCreditCardNumber()");
ccnumber.setAttribute("onfocusout", "validateCreditCardNumber()");
function validateCreditCardNumber() {
  removeExistingErrors('form-error-ccnumber');
  let creditCardValue = ccnumber.value;
  let creditCardLength = creditCardValue.length;
  if (creditCardLength > 12 && creditCardLength < 17 && isANumber(creditCardValue)) {
    ccnumber.classList.remove("error");
  } else if (creditCardLength === 0) {
    errorMessages.ccnumber = 'Please enter your credit card number.';
    createError('ccnumber');
  } else {
    errorMessages.ccnumber = 'Please enter a valid credit card number';
    createError('ccnumber');
  };
};

const cczipcode = document.getElementById('zip');
cczipcode.setAttribute("onkeyup", "validateZIP()");
cczipcode.setAttribute("onfocusout", "validateZIP()");
function validateZIP() {
  removeExistingErrors('form-error-cczipcode');
  if (cczipcode.value.length === 5 && isANumber(cczipcode.value)) {
    cczipcode.classList.remove("error");
  } else {
    createError('cczipcode');
  };
};

const cvv = document.getElementById('cvv');
cvv.setAttribute("onkeyup", "validateCVV()");
cvv.setAttribute("onfocusout", "validateCVV()");
function validateCVV() {
  removeExistingErrors('form-error-cvv');
  if (cvv.value.length === 3 && isANumber(cvv.value)) {
    cvv.classList.remove("error");
  } else if (cvv.value.length === 0) {
    errorMessages.cvv = 'Please enter your CVV.';
    createError('cvv');
  } else {
    errorMessages.cvv = 'Please enter a valid CVV.';
    createError('cvv');
  };
};

function validateCreditCard() {
  let selectedPayment = paymentChoice.selectedIndex;
  if (selectedPayment === 1) {
    validateCreditCardNumber();
    validateZIP();
    validateCVV();
  };
};

/*
  -- FORM SUBMISSION
*/
// Functions for form feedback/reset
function formFeedbackSuccess() {
  let feedbackContainer = document.createElement('div');
  feedbackContainer.classList.add('form-feedback-message');
  formReset();
  feedbackContainer.innerHTML = `<strong>Awesome!</strong> ` +
  `We're excited to have you at Full Stack Conf! See you soon!`;
  pageContainer.insertBefore(feedbackContainer, form);
}

function formFeedbackFail() {
  let feedbackContainer = document.createElement('div');
  feedbackContainer.classList.add('form-feedback-message','form-invalid');
  feedbackContainer.innerHTML = `<strong>Bummer!</strong> ` +
  `One or more of the form fields are invalid. Please correct your errors and resubmit the form.`;
  pageContainer.insertBefore(feedbackContainer, form);
}

// Upon form submission, validate form
function submitForm() {
  event.preventDefault();
  // reset validation errors, then validate each section
  validationErrors = 0;
  validateName();
  validateEmail();
  validateJobRole();
  validateShirt();
  validateActivities();
  validateCreditCard();
  // scroll to top where feedback will appear
  window.scrollTo(0,0);
  removeExistingErrors("form-feedback-message");
  if (validationErrors > 0) {
    formFeedbackFail();
  } else {
    formFeedbackSuccess();
  };
};

function formReset() {
  form.reset();
  hideShirtColors();
  hideJobOtherField();
  paymentChoiceSelection.credit_card();
  costTotal = 0;
  setCostTotal();
  for(let i=0; i< activityCheckboxes.length; i++) {
    activityCheckboxes[i].disabled = false;
  };
};

/*
  -- ON LOAD - focuses text, sets up relevant fields
*/
window.onload = function() {
  let input = document.getElementById("name").focus();
  formReset();
}
