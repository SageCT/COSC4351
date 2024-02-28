const directions = {
   UP: 'up',
   DOWN: 'down',
   LEFT: 'left',
   RIGHT: 'right'
}

window.addEventListener("load", function () {
   const canvas = document.querySelector("canvas");

   // Draw 4 frogs facing different directions
   drawFrog(canvas, 50, 50, directions.UP);
   drawFrog(canvas, 180, 50, directions.DOWN);   
   drawFrog(canvas, 50, 180, directions.LEFT);
   drawFrog(canvas, 180, 180, directions.RIGHT);
});

function drawFrog(canvas, x, y, direction = directions.UP) {   
   const context = canvas.getContext("2d");
   const frogImg = document.querySelector("img");

   switch (direction) {
       case directions.DOWN:
           // Translate the canvas origin to the center of the frog image
           context.translate(x + frogImg.width / 2, y + frogImg.height / 2);
           // Rotate 180 degrees for facing down
           context.rotate(Math.PI);
           // Translate back to the original origin
           context.translate(-(x + frogImg.width / 2), -(y + frogImg.height / 2));
           break;
       case directions.LEFT:
           // Translate the canvas origin to the center of the frog image
           context.translate(x + frogImg.width / 2, y + frogImg.height / 2);
           // Rotate 90 degrees counterclockwise for facing left
           context.rotate(-Math.PI / 2);
           // Translate back to the original origin
           context.translate(-(x + frogImg.width / 2), -(y + frogImg.height / 2));
           break;
       case directions.RIGHT:
           // Translate the canvas origin to the center of the frog image
           context.translate(x + frogImg.width / 2, y + frogImg.height / 2);
           // Rotate 90 degrees clockwise for facing right
           context.rotate(Math.PI / 2);
           // Translate back to the original origin
           context.translate(-(x + frogImg.width / 2), -(y + frogImg.height / 2));
           break;
       // For "up" direction, no translation or rotation is needed as it's the default direction
       default:
           break;
   }

   // Draw the frog image
   context.drawImage(frogImg, x, y);
}
