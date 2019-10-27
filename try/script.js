var csv = document.getElementById('canvas');
var cxt = csv.getContext("2d");


var maxWidth = csv.width;
var maxHeight = csv.height;
var gridWidth = 25;
var gridHeight = 25;
var grid = new Array();
var radius;
var shadowRadius;
var maxRadius = 12.5;

function displayGrid(){
cxt.beginPath();
for (var i=0;i< maxWidth;i++){
cxt.moveTo(gridWidth*i,0);
cxt.lineTo(gridWidth*i,maxHeight);

cxt.moveTo(0,gridHeight*i);
cxt.lineTo(maxWidth,gridHeight*i);
}
cxt.strokeStyle = "red";
cxt.stroke();

}



/*
canvas.addEventListener("mousemove", function (evt) {
  var  mousePos = getMousePos(canvas, evt);
    //   console.log(mousePos.x + ',' + mousePos.y);

cxt.clearRect(0,0,csv.width,csv.height);
displayGrid();
displayHighlight(mousePos);

}, false);

*/

displayGrid();

canvas.addEventListener("mousedown",function(event){
  radius = 0;
  shadowRadius = 5;
  var mousePos = getMousePos(canvas,event);
  var X = Math.floor(mousePos.x / gridWidth);
  var Y = Math.floor(mousePos.y / gridHeight);
  grid.push({x:X,y:Y});

  animateClick();

},false);


function animateClick(x,y){
 var x = grid[grid.length - 1 ].x;
 var y = grid[grid.length -1].y;

 radius += 0.3;
 shadowRadius += 0.22;


 cxt.beginPath();
 //cxt.shadowBlur=10;
 //cxt.shadowColor='rgba(11, 149, 180, 0.85)';
 cxt.fillStyle ='rgba(9, 150, 195,0.1)' ;
 cxt.arc(x*gridWidth+Math.floor(gridWidth/2), y*gridHeight+Math.floor(gridHeight/2),shadowRadius,0,2 * Math.PI,false);
  cxt.fill();

  cxt.beginPath();
 cxt.fillStyle = 'rgb(12, 14, 205)';
 cxt.arc(x*gridWidth+Math.floor(gridWidth/2), y*gridHeight+Math.floor(gridHeight/2),radius,0,2 * Math.PI,false);

 console.log(radius +' , ' +x );
 cxt.fill();

if (radius < maxRadius){
   window.requestAnimationFrame(animateClick);

}

}





//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };

}



function displayHighlight(pos){
   var x = Math.floor(pos.x / gridWidth);
   var y =  Math.floor(pos.y / gridHeight);

  cxt.fillStyle = "white";
  cxt.fillRect(x*gridWidth,y*gridHeight,gridWidth,gridHeight);


}

function displayClickedGrid(){
cxt.fillStyle = "white";
//var x,y;
for (var i = 0 ; i < grid.length ; i++)
{
  //cxt.fillRect(grid[i].x*gridWidth,grid[i].y*gridHeight,gridWidth,gridHeight);
// console.log(grid[i].x + ' , ' + grid[i].y);


cxt.beginPath();
cxt.arc(grid[i].x*gridWidth+Math.floor(gridWidth/2), grid[i].y*gridHeight+Math.floor(gridHeight/2),maxRadius,0,2 * Math.PI,false);
cxt.fill();

}


}

/*
context.beginPath();
  // Staring point (10,45)
   context.moveTo(10,45);
  // End point (180,47)
  context.lineTo(180,47);
  // Make the line visible
  context.stroke();

  */
