// Sets up form elements as referencable objects
// adds submission call
// initiates validationErrors
const form = document.getElementsByTagName('form')[0];
const pageContainer = document.getElementsByClassName('container')[0];
form.setAttribute("onsubmit", "return submitForm()");
form.setAttribute("action", "");
let validationErrors = 0;

/*
  #1 -- NAME
*/

// Adds javascript action for name field
const nameField = document.getElementById('name');
nameField.setAttribute("onfocusout", "validateName()");

function validateName() {
  let nameValue = nameField.value;
  removeExistingErrors('form-error-name');
  if (nameValue === '') {
    createErrorElement('form-error', 'form-error-name','Please add a name.', nameField, true)
  } else {
    nameField.classList.remove("error");
  };
};

/*
  #2 -- EMAIL
*/

// Adds javascript action for email field
const emailField = document.getElementById('mail');
emailField.setAttribute("onkeyup", "validateEmail()");
emailField.setAttribute("onfocusout", "validateEmail()");

function validateEmail() {
  var email = emailField.value;
  var testterms = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  removeExistingErrors('form-error-email');
  if (testterms.test(email)) {
    emailField.classList.remove("error");
  } else if (email === ''){
    createErrorElement('form-error','form-error-email','Please add your email.', emailField, true)
  } else {
    createErrorElement('form-error','form-error-email','Please enter a valid email.', emailField, true)
  };
};

/*
  #3 -- JOB ROLE
*/

// Adds javascript to job selection dropdown and collects necessary objects
const otherFieldContainer = document.getElementById('job-other-container');
const otherField = document.getElementById('other-job');
otherField.setAttribute("onfocusout", "validateJobRole()");
otherField.setAttribute("onkeypress", "validateJobRole()");
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
    otherField.classList.remove("error");
  }
};

// If "other" is selected, make sure they've added a job role
function validateJobRole() {
  removeExistingErrors('form-error-job');
  const finalJobValue = jobFields.options[jobFields.selectedIndex].value;
  if (finalJobValue === "other" && otherField.value === '') {
    createErrorElement('form-error', 'form-error-job','Please add your role.', otherField, true)
  } else {
    otherField.classList.remove("error");
  }
};

/*
  #4 -- SHIRT CHOICE
*/

// Adds javascript action for shirt choice
const shirtChoice = document.getElementById('design');
shirtChoice.setAttribute("onchange", "onShirtDesignSelection()");

// Helpers for hiding or showing shirt colors
const shirtColor = document.getElementById('colors-js-puns');
const hideShirtColors = () => shirtColor.style.display = "none";
const showShirtColors = () => shirtColor.style.display = "block";

const shirtTitle = document.getElementsByClassName('shirt')[0].nextSibling;

// When design is selected, show relevant color choices
function onShirtDesignSelection() {
  const selectedDesignIndex = shirtChoice.selectedIndex;
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
  const selectedDesignIndex = shirtChoice.selectedIndex;
  if (selectedDesignIndex === 0) {
    createErrorElement('form-error-cc', 'form-error-shirt','Please select a shirt design.', shirtChoice, false);
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
const activityTitle = activityFieldSet.getElementsByTagName('legend')[0];

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
    createErrorElement('form-error-activities','none','You must select at least one activity.', activityTitle, false);
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
var showCreditCardInfo = () => creditCardInfo.style.display = "block";
var showBitcoinInfo = () => bitcoinInfo.style.display = "block";
var showPaypalInfo = () => paypalInfo.style.display = "block";

// hide all payment types
var hideAllPaymentInfo = () => {
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

// Helper function to test if a string is all numbers for
// credit card, zipcode, and cvv use.
function isANumber(str){
  return !/\D/.test(str);
}

// Credit Card Number Validation
const creditCardNumber = document.getElementById('cc-num');
creditCardNumber.setAttribute("onkeyup", "validateCreditCardNumber()");
creditCardNumber.setAttribute("onfocusout", "validateCreditCardNumber()");
function validateCreditCardNumber() {
  removeExistingErrors('form-error-cc-number');
  let creditCardValue = creditCardNumber.value;
  let creditCardLength = creditCardValue.length;
  if (creditCardLength > 12 && creditCardLength < 17 && isANumber(creditCardValue)) {
    creditCardNumber.classList.remove("error");
  } else if (creditCardLength === 0) {
    createErrorElement('form-error-cc','form-error-cc-number','Please enter your credit card number.', creditCardNumber, false)
  } else {
    createErrorElement('form-error-cc','form-error-cc-number','Please enter a valid credit card number.', creditCardNumber, false)
  };
};

const zipcode = document.getElementById('zip');
zipcode.setAttribute("onkeyup", "validateZIP()");
zipcode.setAttribute("onfocusout", "validateZIP()");
function validateZIP() {
  removeExistingErrors('form-error-cc-zip');
  if (zipcode.value.length === 5 && isANumber(zipcode.value)) {
    zipcode.classList.remove("error");
  } else {
    createErrorElement('form-error-cc','form-error-cc-zip',"Please enter your ZIP code.", zipcode, false)
  };
};

const cvv = document.getElementById('cvv');
cvv.setAttribute("onkeyup", "validateCVV()");
cvv.setAttribute("onfocusout", "validateCVV()");
function validateCVV() {
  removeExistingErrors('form-error-cc-cvv');
  let cvvValue = cvv.value;
  let cvvLength = cvvValue.length;
  if (cvvLength === 3 && isANumber(cvvValue)) {
    cvv.classList.remove("error");
  } else if (cvvLength === 0) {
    createErrorElement('form-error-cc','form-error-cc-cvv',"Please enter your CVV code.", cvv, false)
  } else {
    createErrorElement('form-error-cc','form-error-cc-cvv','Please enter a valid CVV.', cvv, false)
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
  feedbackContainer.classList.add('form-feedback-message');
  feedbackContainer.classList.add('form-invalid');
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
  for(var i=0; i< activityCheckboxes.length; i++) {
    activityCheckboxes[i].disabled = false;
  };
};

/*
  ERROR HELPERS
*/

function createErrorElement(class1, class2, text, itemparent, before) {
  validationErrors += 1;
  errorMessage = document.createElement('div');
  errorMessage.classList.add(class1,class2);
  errorMessage.textContent = text;
  if (before) {
    itemparent.parentNode.insertBefore(errorMessage, itemparent);
  } else {
    itemparent.parentNode.insertBefore(errorMessage, itemparent.nextSibling);
  };
  itemparent.classList.add("error");
};

function removeExistingErrors(classname) {
  var feedbackError = document.getElementsByClassName(classname);
  if (feedbackError.length > 0) {
    feedbackError[0].parentNode.removeChild(feedbackError[0]);
  };
}

/*
  -- ON LOAD - focuses text, sets up relevant fields
*/
window.onload = function() {
  var input = document.getElementById("name").focus();
  formReset();
}
