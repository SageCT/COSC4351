function checkForm() {
   // Reset the formErrors div
   const formErrorsDiv = document.getElementById("formErrors");
   formErrorsDiv.innerHTML = "";
   formErrorsDiv.style.display = "none";

   // Reset the borders of input fields
   const inputFields = document.querySelectorAll("input");
   inputFields.forEach(input => {
      input.style.border = "1px solid #aaa";
   });

   // Retrieve input values
   const fullName = document.getElementById("fullName").value.trim();
   const email = document.getElementById("email").value.trim();
   const password = document.getElementById("password").value.trim();
   const passwordConfirm = document.getElementById("passwordConfirm").value.trim();

   // Validation checks
   let isValid = true;

   if (fullName.length === 0) {
      displayError("Missing full name.");
      document.getElementById("fullName").style.border = "2px solid rgb(255, 0, 0)";
      isValid = false;
   }

   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
   if (!emailRegex.test(email)) {
      displayError("Invalid or missing email address.");
      document.getElementById("email").style.border = "2px solid rgb(255, 0, 0)";
      isValid = false;
   }

   if (password.length < 10 || password.length > 20) {
      displayError("Password must be between 10 and 20 characters.");
      document.getElementById("password").style.border = "2px solid rgb(255, 0, 0)";
      isValid = false;
   }

   if (!/[a-z]/.test(password)) {
      displayError("Password must contain at least one lowercase character.");
      document.getElementById("password").style.border = "2px solid rgb(255, 0, 0)";
      isValid = false;
   }

   if (!/[A-Z]/.test(password)) {
      displayError("Password must contain at least one uppercase character.");
      document.getElementById("password").style.border = "2px solid rgb(255, 0, 0)";
      isValid = false;
   }

   if (!/\d/.test(password)) {
      displayError("Password must contain at least one digit.");
      document.getElementById("password").style.border = "2px solid rgb(255, 0, 0)";
      isValid = false;
   }

   if (password !== passwordConfirm) {
      displayError("Password and confirmation password don't match.");
      document.getElementById("passwordConfirm").style.border = "2px solid rgb(255, 0, 0)";
      isValid = false;
   }

   // Display or hide formErrors div based on validation result
   if (!isValid) {
      formErrorsDiv.style.display = "block";
   }

   return isValid;
}

function displayError(message) {
   const formErrorsDiv = document.getElementById("formErrors");
   const errorMessage = document.createElement("li");
   errorMessage.textContent = message;
   errorMessage.style.color = "red";
   formErrorsDiv.appendChild(errorMessage);
}

document.getElementById("submit").addEventListener("click", function(event) {
   checkForm();

   // Prevent default form action. DO NOT REMOVE THIS LINE
   event.preventDefault();
});
