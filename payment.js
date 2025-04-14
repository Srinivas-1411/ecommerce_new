const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const confirmButton = document.getElementById("confirmButton");
const cardNumberInput = document.querySelector("#card-number");
const expirationDateInput = document.querySelector("#expiration");
const CVVInput = document.querySelector("#cvv");
const confirmationPopup = document.getElementById("confirmationPopup");
const mobileNumberInput = document.getElementById("mobile-number"); // Mobile number field

// Credit card icon update based on card type
const visaIcon = "./icons/visa.svg";
const mastercardIcon = "./icons/mastercard.svg";
const defaultCardIcon = "./icons/credit-card.png";
const cardImgElement = document.querySelector("#card-icon");

const cleaveCC = new Cleave(cardNumberInput, {
  creditCard: true,
  delimiter: " ",
  blocks: [4, 4, 4, 4],
  onCreditCardTypeChanged: function (type) {
    cardImgElement.src = type === "visa" ? visaIcon : type === "mastercard" ? mastercardIcon : defaultCardIcon;
  },
});

new Cleave(expirationDateInput, { date: true, datePattern: ["m", "y"] });
new Cleave(CVVInput, { numeralPositiveOnly: true, blocks: [3] });

// Check if all fields are filled and valid
function checkInputsFilled() {
  const areAllFilled = Array.from(inputs).every(input => input.value.trim() !== "");
  confirmButton.disabled = !areAllFilled || !validateForm(false);
  confirmButton.classList.toggle("disabled", confirmButton.disabled);
}

// Validate form fields (either silently or with alerts)
function validateForm(showAlerts = true) {
  const fullName = document.getElementById("full-name").value.trim();
  const cardNumber = document.getElementById("card-number").value.trim();
  const expiration = document.getElementById("expiration").value.trim();
  const cvv = document.getElementById("cvv").value.trim();
  const address = document.getElementById("address").value.trim();
  const mobileNumber = mobileNumberInput.value.trim(); // Mobile number field
  
  if (fullName === "" && showAlerts) return alert("Please enter your full name."), false;
  
  if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber) && showAlerts) {
    return alert("Please enter a valid 16-digit card number in the format '1234 5678 9012 3456'."), false;
  }
  
  if ((!/^\d{2}\/\d{2}$/.test(expiration) || !isValidExpirationDate(expiration)) && showAlerts) {
    return alert("Please enter a valid expiration date in MM/YY format."), false;
  }
  
  if (!/^\d{3}$/.test(cvv) && showAlerts) {
    return alert("Please enter a valid 3-digit CVV."), false;
  }
  
  if (address === "" && showAlerts) return alert("Please enter your address."), false;
  
  // Validate mobile number (only 10 digits)
  if (!/^\d{10}$/.test(mobileNumber) && showAlerts) {
    return alert("Please enter a valid mobile number with exactly 10 digits."), false;
  }
  
  return true;
}

function isValidExpirationDate(expiration) {
  const [month, year] = expiration.split("/").map(Number);
  const now = new Date();
  const expiryDate = new Date(`20${year}`, month - 1, 1); // Set to the first day of the expiration month
  return expiryDate > now && month >= 1 && month <= 12;
}

// Display order confirmation animation
function showConfirmationAnimation() {
  confirmationPopup.style.display = "flex";
  confirmationPopup.classList.add("confirm-order"); // Add animation class
  setTimeout(closePopup, 3000); // Close popup after 3 seconds
}

// Close the confirmation popup
function closePopup() {
  confirmationPopup.style.display = "none";
}

// Event listeners for inputs
inputs.forEach(input => {
  input.addEventListener("input", checkInputsFilled);
});

// Confirm button click event
confirmButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (validateForm()) {
    showConfirmationAnimation();
  }
});

// Initialize form on page load
document.addEventListener("DOMContentLoaded", checkInputsFilled);
