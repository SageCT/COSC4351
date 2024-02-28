function parseScores(scoresString) {
    return scoresString.split(" ");
}

function buildDistributionArray(scoresArray) {
    let distributionArray = [0, 0, 0, 0, 0];
    for (let score of scoresArray) {
        let numericScore = parseInt(score);
        if (!isNaN(numericScore)) {
            if (numericScore >= 90) {
                distributionArray[0]++;
            } else if (numericScore >= 80 && numericScore < 90) {
                distributionArray[1]++;
            } else if (numericScore >= 70 && numericScore < 80) {
                distributionArray[2]++;
            } else if (numericScore >= 60 && numericScore < 70) {
                distributionArray[3]++;
            } else if (numericScore < 60) {
                distributionArray[4]++;
            }
        }
    }
    return distributionArray;
}



function setTableContent(userInput) {
    let scoresArray = parseScores(userInput);
    let distributionArray = buildDistributionArray(scoresArray);
    let tableContent = "";

    if(userInput == "") {
        tableContent = "<tr><td colspan='5'>No graph to display</td></tr>";
    }

    else{
        // Build bars row
        tableContent += "<tr>";
        for (let i = 0; i < distributionArray.length; i++) {
            let barHeight = distributionArray[i] * 10;
            tableContent += `<td><div style="height:${barHeight}px" class="bar${i}"></div></td>`;
        }
        tableContent += "</tr>";

        // Build grade labels row
        tableContent += "<tr>";
            tableContent += `<td>A</td>`;
            tableContent += `<td>B</td>`;
            tableContent += `<td>C</td>`;
            tableContent += `<td>D</td>`;
            tableContent += `<td>F</td>`;
        tableContent += "</tr>";

        // Build occurrences row
        tableContent += "<tr>";
        for (let occurrences of distributionArray) {
            tableContent += `<td>${occurrences}</td>`;
        }
        tableContent += "</tr>";
    }
    

    document.getElementById("distributionTable").innerHTML = tableContent;
}





function bodyLoaded() {
    // The argument passed to writeTableContent can be changed for 
    // testing purposes
    setTableContent("45 78 98 83 86 99 90 59");
}
