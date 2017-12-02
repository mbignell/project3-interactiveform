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
  var nameFeedback = document.getElementsByClassName("form-error-name");
  if (nameFeedback.length > 0) {
    nameFeedback[0].parentNode.removeChild(nameFeedback[0]);
  };
  if (nameValue === '') {
    let nameFieldError = document.createElement('div');
    nameFieldError.classList.add('form-error', 'form-error-name');
    nameFieldError.textContent = 'Please add a name.'
    nameField.parentNode.insertBefore(nameFieldError, nameField);
    nameField.classList.add("error");
    validationErrors += 1;
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
  var emailFeedback = document.getElementsByClassName("form-error-email");
  if (emailFeedback.length > 0) {
    emailFeedback[0].parentNode.removeChild(emailFeedback[0]);
  };
  if (testterms.test(email)) {
    emailField.classList.remove("error");
  } else if (email === ''){
    validationErrors += 1
    emailField.classList.add("error");
    let emailFieldError = document.createElement('div');
    emailFieldError.classList.add('form-error', 'form-error-email');
    emailFieldError.textContent = 'Please add your email.'
    emailField.parentNode.insertBefore(emailFieldError, emailField);
  } else {
    validationErrors += 1
    emailField.classList.add("error");
    let emailFieldError = document.createElement('div');
    emailFieldError.classList.add('form-error', 'form-error-email');
    emailFieldError.textContent = 'Please enter a valid email.'
    emailField.parentNode.insertBefore(emailFieldError, emailField);
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
var hideJobOtherField = () => otherFieldContainer.style.display = "none";
var showJobOtherField = () => otherFieldContainer.style.display = "block";

// Make "other" field appear if "other is selected"
function onJobSelection() {
  let selectedJobValue = jobFields.options[jobFields.selectedIndex].value;
  if (selectedJobValue === "other") {
    showJobOtherField();
  } else {
    hideJobOtherField();
    otherField.classList.remove("error");
  }
};

// When leaving the focus of the "other" field or
// when submitting the form
// if "other" is selected, make sure they've added a job role
function validateJobRole() {
  var jobFeedback = document.getElementsByClassName("form-error-job");
  if (jobFeedback.length > 0) {
    jobFeedback[0].parentNode.removeChild(jobFeedback[0]);
  };
  let finalJobValue = jobFields.options[jobFields.selectedIndex].value;
  if (finalJobValue === "other" && otherField.value === '') {
    validationErrors += 1;
    let otherFieldError = document.createElement('div');
    otherFieldError.classList.add('form-error', 'form-error-job');
    otherFieldError.textContent = 'Please add your role.'
    otherField.parentNode.insertBefore(otherFieldError, otherField);
    otherField.classList.add("error");
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
var hideShirtColors = () => shirtColor.style.display = "none";
var showShirtColors = () => shirtColor.style.display = "block";

const shirtTitle = document.getElementsByClassName('shirt')[0].nextSibling;
console.log(shirtTitle);

// Show color choices only if the design is selected
// When design is selected, show relevant color choices
function onShirtDesignSelection() {
  let selectedDesignIndex = shirtChoice.selectedIndex;
  let colorChoices = document.getElementById('color');
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
  var shirtFeedback = document.getElementsByClassName("form-error-shirt");
  if (shirtFeedback.length > 0) {
    shirtFeedback[0].parentNode.removeChild(shirtFeedback[0]);
  };
  let selectedDesignIndex = shirtChoice.selectedIndex;
  if (selectedDesignIndex === 0) {
    validationErrors += 1;
    let shirtError = document.createElement('div');
    shirtError.classList.add('form-error-cc', 'form-error-shirt');
    shirtError.textContent = 'Please select a shirt design.';
    shirtChoice.parentNode.insertBefore(shirtError, shirtChoice.nextSibling);
  } else {
  };
};

/*
  #5 -- ACTIVITIES
*/

// Adds javascript action for activity selection
const activityFieldSet = document.getElementsByClassName('activities')[0];
const activityCheckboxes = activityFieldSet.getElementsByTagName('input');
for(var i=0; i< activityCheckboxes.length; i++) {
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
  if (costTotal > 0) {
    activityTitle.innerHTML = 'Register for Activities';
    return;
  } else {
    validationErrors += 1;
    activityTitle.innerHTML = 'Register for Activities <br/><div class="form-error-activities">You must select at least one activity.</div>';
  };
};

/*
  #6 -- PAYMENT
*/

// Adds javascript action for payment choice
const paymentChoice = document.getElementById('payment');
paymentChoice.setAttribute("onchange", "onPaymentSelection()");

// show/hide credit card info
const creditCardInfo = document.getElementById('credit-card');
var hideCreditCardInfo = () => creditCardInfo.style.display = "none";
var showCreditCardInfo = () => creditCardInfo.style.display = "block";

// show/hide bitcoin info
const bitcoinInfo = document.getElementById('bitcoin-info');
var hideBitcoinInfo = () => bitcoinInfo.style.display = "none";
var showBitcoinInfo = () => bitcoinInfo.style.display = "block";

// show/hide paypal info
const paypalInfo = document.getElementById('paypal-info');
var hidePaypalInfo = () => paypalInfo.style.display = "none";
var showPaypalInfo = () => paypalInfo.style.display = "block";

// On payment choice, show the relevant divs of information and hide the rest.
// If nothing is selected, hide all options.
function onPaymentSelection() {
  let selectedPayment = paymentChoice.selectedIndex;
  if (selectedPayment === 0) {
    hideCreditCardInfo();
    hideBitcoinInfo();
    hidePaypalInfo();
  } else if (selectedPayment === 1) {
    showCreditCardInfo();
    hideBitcoinInfo();
    hidePaypalInfo();
  } else if (selectedPayment === 2) {
    hideCreditCardInfo();
    showPaypalInfo();
    hideBitcoinInfo();
  } else if (selectedPayment === 3) {
    hideCreditCardInfo();
    hidePaypalInfo();
    showBitcoinInfo();
  };
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
  var ccFeedback = document.getElementsByClassName("form-error-cc-number");
  if (ccFeedback.length > 0) {
    ccFeedback[0].parentNode.removeChild(ccFeedback[0]);
  };
  let creditCardValue = creditCardNumber.value;
  let creditCardLength = creditCardValue.length;
  if (creditCardLength > 12 && creditCardLength < 17 && isANumber(creditCardValue)) {
    creditCardNumber.classList.remove("error");
  } else if (creditCardLength === 0) {
    let creditNumberError = document.createElement('div');
    creditNumberError.classList.add('form-error-cc','form-error-cc-number');
    creditNumberError.textContent = 'Please enter your credit card number.'
    creditCardNumber.parentNode.insertBefore(creditNumberError, creditCardNumber.nextSibling);
    creditCardNumber.classList.add("error");
  } else {
    validationErrors += 1;
    let creditNumberError = document.createElement('div');
    creditNumberError.classList.add('form-error-cc','form-error-cc-number');
    creditNumberError.textContent = 'Please enter a valid credit card number.'
    creditCardNumber.parentNode.insertBefore(creditNumberError, creditCardNumber.nextSibling);
    creditCardNumber.classList.add("error");
  };
};

const zipcode = document.getElementById('zip');
zipcode.setAttribute("onkeyup", "validateZIP()");
zipcode.setAttribute("onfocusout", "validateZIP()");
function validateZIP() {
  var ccFeedback = document.getElementsByClassName("form-error-cc-zip");
  if (ccFeedback.length > 0) {
    ccFeedback[0].parentNode.removeChild(ccFeedback[0]);
  };
  let zipcodeValue = zipcode.value
  let zipcodeLength = zipcodeValue.length;
  if (zipcodeLength === 5 && isANumber(zipcodeValue)) {
    zipcode.classList.remove("error");
  } else {
    validationErrors += 1;
    let creditZIPError = document.createElement('div');
    creditZIPError.classList.add('form-error-cc','form-error-cc-zip');
    creditZIPError.textContent = 'Please enter your ZIP code.';
    creditCardNumber.parentNode.insertBefore(creditZIPError, creditCardNumber.nextSibling);
    zipcode.classList.add("error");
  };
};

const cvv = document.getElementById('cvv');
cvv.setAttribute("onkeyup", "validateCVV()");
cvv.setAttribute("onfocusout", "validateCVV()");
function validateCVV() {
  var ccFeedback = document.getElementsByClassName("form-error-cc-cvv");
  if (ccFeedback.length > 0) {
    ccFeedback[0].parentNode.removeChild(ccFeedback[0]);
  };
  let cvvValue = cvv.value
  let cvvLength = cvvValue.length;
  if (cvvLength === 3 && isANumber(cvvValue)) {
    console.log('number!');
    cvv.classList.remove("error");
  } else if (cvvLength === 0) {
    validationErrors += 1;
    let creditCVVError = document.createElement('div');
    creditCVVError.classList.add('form-error-cc','form-error-cc-cvv');
    creditCVVError.textContent = 'Please enter your CVV code.';
    creditCardNumber.parentNode.insertBefore(creditCVVError, creditCardNumber.nextSibling);
    cvv.classList.add("error");
  } else {
    validationErrors += 1;
    let creditCVVError = document.createElement('div');
    creditCVVError.classList.add('form-error-cc','form-error-cc-cvv');
    creditCVVError.textContent = 'Please enter a valid CVV.';
    creditCardNumber.parentNode.insertBefore(creditCVVError, creditCardNumber.nextSibling);
    cvv.classList.add("error");
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
  // reset validation errors
  validationErrors = 0;
  // validate each portion
  validateName();
  validateEmail();
  validateJobRole();
  validateShirt();
  validateActivities();
  validateCreditCard();

  window.scrollTo(0,0);
  var feedback = document.getElementsByClassName("form-feedback-message");
  if (feedback.length > 0) {
    feedback[0].parentNode.removeChild(feedback[0]);
  };
  if (validationErrors > 0) {
    console.log("no bueno!");
    formFeedbackFail();
  } else {
    console.log("bueno!");
    formFeedbackSuccess();
  };
};

function formReset() {
  form.reset();
  hideShirtColors();
  hideJobOtherField();
  showCreditCardInfo();
  hidePaypalInfo();
  hideBitcoinInfo();
  costTotal = 0;
  setCostTotal();
  for(var i=0; i< activityCheckboxes.length; i++) {
    activityCheckboxes[i].disabled = false;
  };
};

/*
  -- ON LOAD
  Focuses text field an initiates default values.
*/
window.onload = function() {
  var input = document.getElementById("name").focus();
  hideJobOtherField();
  hideShirtColors();
  hidePaypalInfo();
  hideBitcoinInfo();
}
