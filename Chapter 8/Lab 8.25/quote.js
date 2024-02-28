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

// TODO: Modify to use Fetch API
function fetchQuotes(topic, count) {
   // Construct the URL based on the selected topic and count
   const url = `https://wp.zybooks.com/quotes.php?topic=${topic}&count=${count}`;

   // Fetch quotes from the API
   fetch(url)
      .then(response => {
         // Check if the response is successful
         if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
         }
         return response.json();
      })
      .then(data => {
         // Clear the existing quotes
         const quotesDiv = document.querySelector("#quotes");
         quotesDiv.innerHTML = "";

         // Check if the response contains an error message
         if (data.error) {
            // Display the error message
            quotesDiv.textContent = data.error;
         } else {
            // Create an ordered list to display the quotes
            const ol = document.createElement("ol");

            // Iterate over the quotes and create list items for each
            data.forEach((quote, index) => {
               const li = document.createElement("li");
               li.textContent = `${quote.quote} - ${quote.source}`;
               ol.appendChild(li);
            });

            // Append the ordered list to the quotes div
            quotesDiv.appendChild(ol);
         }
      })
      .catch(error => {
         // Display any errors that occur during the fetch process
         const quotesDiv = document.querySelector("#quotes");
         quotesDiv.textContent = error.message;
      });
}
