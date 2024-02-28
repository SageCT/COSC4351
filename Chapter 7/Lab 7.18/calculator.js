/* Attack Vector Handling */
const avMapping = {
    "AV_N": 0.85,
    "AV_A": 0.62,
    "AV_L": 0.55,
    "AV_P": 0.20
};
const avRadios = document.getElementsByName("AV");
avRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Attack Complexity Handling */
const acMapping = {
    "AC_L": 0.77,
    "AC_H": 0.44
};
const acRadios = document.getElementsByName("AC");
acRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Privilege Required Handling */
const prMapping = {
    "PR_N": 0.85,
    "PR_L": 0.62,
    "PR_H": 0.27
};
const prRadios = document.getElementsByName("PR");
prRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* User Interaction Handling */
const uiMapping = {
    "UI_N": 0.85,
    "UI_R": 0.62
};
const uiRadios = document.getElementsByName("UI");
uiRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Scope Handling */
const scopeMapping = {
    "scope_U": 1.0,
    "scope_C": 1.08
};
const scopeRadios = document.getElementsByName("scope");
scopeRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Confidentiality Impact Handling */
const confRadios = document.getElementsByName("conf");
confRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Integrity Impact Handling */
const integRadios = document.getElementsByName("integ");
integRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Availability Impact Handling */
const availRadios = document.getElementsByName("avail");
availRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Health Impact Handling */
const healthRadios = document.getElementsByName("health");
healthRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Sensitivity Handling */
const sensRadios = document.getElementsByName("sens");
sensRadios.forEach(radio => {
    radio.addEventListener("click", updateScore);
});

/* Sensitivity / Confidentiality Mapping */
const sensitivityConfidentialityMapping = {
    "sens_N": {
        "conf_N": 0.00,
        "conf_L": 0.22,
        "conf_H": 0.56
    },
    "sens_L": {
        "conf_N": 0.00,
        "conf_L": 0.65,
        "conf_H": 0.75
    },
    "sens_H": {
        "conf_N": 0.00,
        "conf_L": 0.85,
        "conf_H": 0.95
    }
};

/* Health Impact / Integrity Mapping */
const healthIntegrityMapping = {
    "health_N": {
        "integ_N": 0.00,
        "integ_L": 0.22,
        "integ_H": 0.56
    },
    "health_L": {
        "integ_N": 0.55,
        "integ_L": 0.60,
        "integ_H": 0.75
    },
    "health_H": {
        "integ_N": 0.85,
        "integ_L": 0.90,
        "integ_H": 0.95
    }
};

/* Health Impact / Availability Mapping */
const healthAvailabilityMapping = {
    "health_N": {
        "avail_N": 0.00,
        "avail_L": 0.22,
        "avail_H": 0.56
    },
    "health_L": {
        "avail_N": 0.55,
        "avail_L": 0.60,
        "avail_H": 0.65
    },
    "health_H": {
        "avail_N": 0.85,
        "avail_L": 0.90,
        "avail_H": 0.95
    }
};


function updateScore() {
    // Get the selected values for each property
    const selectedAV = getSelectedValue("AV");
    const selectedAC = getSelectedValue("AC");
    const selectedPR = getSelectedValue("PR");
    const selectedUI = getSelectedValue("UI");
    const selectedScope = getSelectedValue("scope");
    const selectedConf = getSelectedValue("conf");
    const selectedInteg = getSelectedValue("integ");
    const selectedAvail = getSelectedValue("avail");
    const selectedHealth = getSelectedValue("health");
    const selectedSens = getSelectedValue("sens");

    // Check is all radios have been selected
    if (selectedAV !== null && selectedAC !== null &&
        selectedPR !== null && selectedUI !== null &&
        selectedScope !== null && selectedConf !== null &&
        selectedInteg !== null && selectedAvail !== null &&
        selectedHealth !== null && selectedSens !== null) {

        // Remove warning since all fields are checked
        document.getElementById("warning").style.display = "none";

        // Access the values from the mappings
        const avValue = avMapping[selectedAV];
        const acValue = acMapping[selectedAC];
        const prValue = prMapping[selectedPR];
        const uiValue = uiMapping[selectedUI];
        const scopeValue = scopeMapping[selectedScope];
        // Base Values
        const sensitivityConfidentialityValue = sensitivityConfidentialityMapping[selectedSens][selectedConf];
        const healthIntegrityValue = healthIntegrityMapping[selectedHealth][selectedInteg];
        const healthAvailabilityValue = healthAvailabilityMapping[selectedHealth][selectedAvail];

        // Calculate the final score using the selected values
        const calculatedScore = calculateFinalScore(avValue, acValue, prValue, uiValue, scopeValue, sensitivityConfidentialityValue, healthIntegrityValue, healthAvailabilityValue);
        let finalScore = Math.ceil(calculatedScore * 10) / 10;

        // Edge case
        finalScore = finalScore < 0 ? 0 : finalScore > 10 ? 10 : finalScore;

        // Display final score on webpage
        document.getElementById("score").innerHTML = finalScore.toFixed(1);


    }
    // Do nothing if all fields are not selected


}

/* This function determines which radio option of each property with 
the same name is selected and returns the value to be further parsed. */
function getSelectedValue(name) {
    const options = document.getElementsByName(name);
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            return options[i].value;
        }
    }
    return null;
}

function calculateFinalScore(_avValue, _acValue, _prValue, _uiValue, _scopeValue, _sensitivityConfidentialityValue, _healthIntegrityValue, _healthAvailabilityValue) {

    // scoreFinal = (scopeValue) * ( (3.326258289 * scoreBase) + (1.1 * scoreExploitability) )
    // where scoreBase = sensitivityConfidentialityValue + healthIntegrityValue + healthAvailabilityValue
    // and scoreExploitability = avValue * acValue * prValue * uiValue

    const scoreBase = _sensitivityConfidentialityValue + _healthIntegrityValue + _healthAvailabilityValue;
    // Edge case
    if (scoreBase == 0) {
        return 0;
    }
    const scoreExploitability = _avValue * _acValue * _prValue * _uiValue;
    const scoreFinal = (_scopeValue) * ((3.326258289 * scoreBase) + (1.1 * scoreExploitability));
    return scoreFinal;
}