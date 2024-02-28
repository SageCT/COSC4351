window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;

      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);
   });
});

function fetchQuotes(topic, count) {
   // TODO: Modify to use XMLHttpRequest
   // let html = "<ol>";
   // for (let c = 1; c <= count; c++) {
   //    html += `<li>Quote ${c} - Anonymous</li>`;
   // }
   // html += "</ol>";
   // document.querySelector("#quotes").innerHTML = html;

   const endpoint = "https://wp.zybooks.com/quotes.php";
   const queryString = `topic=${topic}&count=${count}`;
   let url = `${endpoint}?${queryString}`;
   //console.log(url);

   let xhr = new XMLHttpRequest();
   xhr.addEventListener("load", responseReceivedHandler);
   xhr.responseType = "json";
   xhr.open("GET", url);
   xhr.send();

}

function responseReceivedHandler() {
   //console.log(`handling response: ${this.response}`);
   let response = this.response;

   if (response.error) {
      //console.log("Error");
      document.getElementById("quotes").innerHTML = response.error;
   } else {
      let quoteDiv = document.getElementById("quotes");
      let olNode = document.createElement("ol");
      // Clear previous response
      quoteDiv.innerHTML = '';

      for (let i = 0; i < response.length; i++) {
         //console.log(response[i]);
         let liNode = document.createElement("li");
         liNode.innerHTML = `${response[i].quote} - ${response[i].source}`
         olNode.appendChild(liNode);
      }
      quoteDiv.appendChild(olNode);
   }

}