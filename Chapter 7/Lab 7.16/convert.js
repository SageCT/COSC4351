window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    const cInput = document.getElementById("cInput");
    const fInput = document.getElementById("fInput");
    const convertButton = document.getElementById("convertButton");
    const errorMessage = document.getElementById("errorMessage");

    cInput.addEventListener("input", function() {
        fInput.value = ""; // Clear Fahrenheit input when Celsius input changes
        errorMessage.innerHTML = ""; // Clear error message
    });

    fInput.addEventListener("input", function() {
        cInput.value = ""; // Clear Celsius input when Fahrenheit input changes
        errorMessage.innerHTML = ""; // Clear error message
    });

    convertButton.addEventListener("click", function() {
        let celsius = parseFloat(cInput.value);
        let fahrenheit = parseFloat(fInput.value);

        if (!isNaN(celsius)) {
            // Convert Celsius to Fahrenheit
            fahrenheit = convertCtoF(celsius);
            fInput.value = fahrenheit; // Display Fahrenheit with two decimal places
            // Change image based on temperature in Fahrenheit
            if (fahrenheit < 32) {
                document.getElementById("weatherImage").src = "cold.png";
            } else if (fahrenheit <= 50) {
                document.getElementById("weatherImage").src = "cool.png";
            } else {
                document.getElementById("weatherImage").src = "warm.png";
            }
            errorMessage.innerHTML = ""; // Clear error message
        } else if (!isNaN(fahrenheit)) {
            // Convert Fahrenheit to Celsius
            celsius = convertFtoC(fahrenheit);
            cInput.value = celsius; // Display Celsius with two decimal places
            // Change image based on temperature in Fahrenheit
            if (fahrenheit < 32) {
                document.getElementById("weatherImage").src = "cold.png";
            } else if (fahrenheit <= 50) {
                document.getElementById("weatherImage").src = "cool.png";
            } else {
                document.getElementById("weatherImage").src = "warm.png";
            }
            errorMessage.innerHTML = ""; // Clear error message
        } else {
            // Handle bad input
            if (cInput.value.trim() !== "") {
                errorMessage.innerHTML = cInput.value + " is not a number";
            } else if (fInput.value.trim() !== "") {
                errorMessage.innerHTML = fInput.value + " is not a number";
            } else {
                errorMessage.innerHTML = "Please enter a number";
            }
        }
    });
}
function convertCtoF(degreesCelsius) {
   return degreesCelsius * 9 / 5 + 32;
}

function convertFtoC(degreesFahrenheit) {
   return (degreesFahrenheit - 32) * 5 / 9;
}

console.log(convertCtoF(20));