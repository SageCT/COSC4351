let groceryList = [];

// Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", function() {
   document.querySelector("#addBtn").addEventListener("click", addBtnClick);
   document.querySelector("#clearBtn").addEventListener("click", clearBtnClick);

   // Load the grocery list from localStorage
   groceryList = loadList();
  
   if (groceryList.length > 0) {
      // Display list
      for (let item of groceryList) {
         showItem(item);
      } 
   }
   else {
      // No list to display
      enableClearButton(false);
   }     
});

// Enable or disable the Clear button
function enableClearButton(enabled) {
   document.querySelector("#clearBtn").disabled = !enabled;
}

// Show item at end of the ordered list
function showItem(item) {
   let list = document.querySelector("ol");
   list.innerHTML += `<li>${item}</li>`;     
}

// Add item to grocery list
function addBtnClick() {
   let itemTextInput = document.querySelector("#item");
   let item = itemTextInput.value.trim();
   if (item.length > 0) {
      enableClearButton(true);
      showItem(item);
      groceryList.push(item);

      // Save groceryList to localStorage
      saveList(groceryList);
   }

   // Clear input
   itemTextInput.value = '';
}

// Clear the list
function clearBtnClick() {
   enableClearButton(false);
   groceryList = [];
   let list = document.querySelector("ol");
   list.innerHTML = "";

   // Remove the grocery list from localStorage
   clearList();
}

// Complete the functions below

function loadList() {
   // Load the grocery list from localStorage
   const storedList = localStorage.getItem("list");
   
   // If there's no stored list, return an empty array
   if (!storedList) {
       return [];
   }
   
   // Split the stored string into an array of items
   return storedList.split(",");
}

function saveList(groceryList) {
   // Convert the groceryList array into a comma-delimited string
   const listString = groceryList.join(",");
   
   // Save the string to localStorage under the key "list"
   localStorage.setItem("list", listString);
}

function clearList() {
   // Remove the "list" item from localStorage
   localStorage.removeItem("list");
}
