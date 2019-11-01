const cvs  = document.getElementById('canvas');
const ctx  = cvs.getContext("2d");

const gridWidth  = 50;
const gridHeight  = 50;
const canvasWidth  = cvs.width;
const canvasHeight  = cvs.height;
const gridColor  = 'black';
const nodeFillColor = 'green';
const nodeStrokeColor = 'black';
const nodeLabelColor = 'red';
const nodeRadius = gridWidth/2;
var radius = 0;  //for animation
//for edge
const edgeColor = 'black';
const arrowheadColor = 'black';
var to;
var from;
var edgeFlag = false;  // true indicates that edge is ready to create

//for weight
const weightColor = 'rgb(62, 4, 6)';

//for animation
 var x ,y;

function displayGrid(){
  //creating verticle grid lines
  ctx.strokeStyle  = gridColor;
  for (var i  = 1 ; i <= Math.floor(canvasWidth/gridWidth) ; i++ ){
    ctx.beginPath();
    ctx.moveTo(i*gridWidth,0);
    ctx.lineTo(i*gridWidth,canvasHeight);
    ctx.stroke();
  }
  //creating horizontal grid lines
  for (var i  = 0 ; i < Math.floor(canvasHeight/gridHeight); i++){
       ctx.beginPath();
       ctx.moveTo(0,i * gridHeight);
       ctx.lineTo(canvasHeight,i*gridHeight);
       ctx.stroke();
  }
}

function createNode(evt){
  var pos = getMousePos(cvs,evt);
  var node = getCenterPos(pos.x,pos.y); //return the center of the grid for corresponding x,y

  ctx.fillStyle = nodeFillColor;
  ctx.strokeStyle = nodeStrokeColor;
  radius = 0;
/*
  ctx.beginPath();
  ctx.arc(node.centerX,node.centerY,radius,0,2*Math.PI);  //arc (centerX,cetnterY,radius,initialAngle,finalAngle); //2 * PI = 360deg
  ctx.fill();
  ctx.stroke();
*/
  x = node.centerX;
  y = node.centerY;
  drawNode();

  //display label
/*
  var fontSize = (nodeRadius)*1/1.8 ;  // radius / 1.8;
  ctx.font = fontSize+"px Comic Sans MS";
  ctx.fillStyle = nodeLabelColor;
  ctx.textAlign = "center";
  ctx.fillText(prompt('name of the node','node'), node.centerX, node.centerY);
*/
}


function drawNode(){
  radius += 1;

  ctx.beginPath();
  ctx.arc(x,y,radius,0,2*Math.PI);  //arc (centerX,cetnterY,radius,initialAngle,finalAngle); //2 * PI = 360deg
  ctx.fill();
  ctx.stroke();
console.log(x +" "+y+" "+radius);
if (radius < nodeRadius){
  window.requestAnimationFrame(drawNode);
}

}





function getCenterPos(x,y){  //return the center position of the corresponding grid
  var centerX = Math.floor(x/gridWidth)*gridWidth+(gridWidth/2);  // N*gridwidth + gridWidth/2;
  var centerY = Math.floor(y/gridHeight)*gridHeight+(gridHeight/2);
 return {
    centerX: centerX,
    centerY:centerY
        }
}


function getMousePos(canvas,evt){
  var rect = canvas.getBoundingClientRect();
  var x = evt.clientX - rect.left;
  var y = evt.clientY - rect.top;
  return {
            x:x,
            y:y,
         }
}


function createEdge(event){
    if (edgeFlag == false){
          var pos = getMousePos(cvs,event);
          to = getCenterPos(pos.x,pos.y);
          edgeFlag = true;
    }
    else{
      var pos = getMousePos(cvs,event);
      from = getCenterPos(pos.x,pos.y);
      edgeFlag = false;

      displayEdge(to,from);

    }
}

function displayEdge(to,from){
//clipping edge
  var angle = Math.atan2(to.centerY-from.centerY , to.centerX - from.centerX);

from = {
        x: from.centerX + Math.cos(angle) * nodeRadius, // B = cos(theta) * H
        y: from.centerY + Math.sin(angle) * nodeRadius
      };
to = {
        x: to.centerX - Math.cos(angle) * nodeRadius, // B = cos(theta) * H
        y: to.centerY - Math.sin(angle) * nodeRadius
     };
//----------------------------------------------

  drawEdge(to,from);
  drawArrowhead(to,from,angle,nodeRadius/2);
  addWeight(to,from,angle,'5');



}



function drawEdge(to,from){
  ctx.strokeStyle = edgeColor;
  ctx.beginPath();
  ctx.moveTo(from.x,from.y);
  ctx.lineTo(to.x,to.y);
  ctx.stroke();
}

function drawArrowhead( from, to,angle, radius) {
	var x_center = to.x;
	var y_center = to.y;
	var x;
	var y;

  ctx.fillStyle = arrowheadColor;
	ctx.beginPath();

	angle = Math.atan2(to.y - from.y, to.x - from.x)
	x =  x_center;
	y =  y_center;

	ctx.moveTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	ctx.lineTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius *Math.cos(angle) + x_center;
	y = radius *Math.sin(angle) + y_center;

	ctx.lineTo(x, y);

	ctx.closePath();
	ctx.fill();

}


function addWeight(to,from,angle,weight){
  var midPoint = { x : from.x + Math.round((to.x - from.x)/2) ,y : from.y + Math.round((to.y - from.y)/2) };
  ctx.font = "10px Comic Sans MS";
  ctx.fillStyle = weightColor;
  ctx.textAlign = "center";

  ctx.fillText(weight, midPoint.x-10, midPoint.y-10);  // -10 prohibit overlaping of weight to the edge
}






//add event listenter for creating nodes
cvs.addEventListener('mousedown',createEdge);
cvs.addEventListener('mousedown',createNode);





//displayGrid();
