// HTML for the up, down, and done buttons
const upButtonHtml = '<button class="upBtn">&uarr;</button>';
const downButtonHtml = '<button class="downBtn">&darr;</button>';
const doneButtonHtml = '<button class="doneBtn">&#x2713;</button>';

$(function () {
   $("#addBtn").click(addBtnClick);


   $(document).keypress(function (event) {
      //keyCode for "Enter" is 13
      if (event.key == "Enter" || event.which == 13) {
         addBtnClick();
      }
   })

});

function addBtnClick() {
   let itemText = $("#newItemText").val().trim();

   // Don't add empty strings
   if (itemText.length !== 0) {
      addItem(itemText);

      // Clear text and put focus back in text input
      $("#newItemText").val("").focus();
   }
}

function addItem(item) {
   // Create a new <li> for the list
   let $newItem = $(`<li><span>${item}</span></li>`);

   // Up button moves item up one spot
   let $upButton = $(upButtonHtml).click(function () {
      let index = $(this.parentElement).index();
      moveItem(index, index - 1);
   });

   // Down button moves item down one spot
   let $downButton = $(downButtonHtml).click(function () {
      let index = $(this.parentElement).index();
      moveItem(index, index + 1);
   });

   // Add click hander for done button
   $doneButton = $(doneButtonHtml).click(function () {
      // Remove item from list
      let index = $(this.parentElement).index();
      removeItem(index);
   });

   // Add all buttons to the new item, and add new item to list
   $newItem.append($upButton, $downButton, $doneButton);
   $("ol").append($newItem);
}

function moveItem(fromIndex, toIndex) {

   const currentElement = $("ol li").eq(fromIndex);
   const pivotElement = $("ol li").eq(toIndex)

   if (fromIndex > toIndex) {
      //edge case
      if (toIndex !== -1) {
         $(currentElement).insertBefore(pivotElement);
      }

   } else {
      //edge case
      if (fromIndex !== $("ol li").length - 1) {
         $(currentElement).insertAfter(pivotElement);
      }
   }

}

function removeItem(index) {

   $("ol li").eq(index).remove();

}