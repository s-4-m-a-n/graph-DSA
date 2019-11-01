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
  var node = newNode(pos.x,pos.y); //return the center of the grid for corresponding x,y
  ctx.fillStyle = nodeFillColor;
  ctx.strokeStyle = nodeStrokeColor;
  ctx.beginPath();
  ctx.arc(node.centerX,node.centerY,gridWidth/2,0,2*Math.PI);  //arc (centerX,cetnterY,radius,initialAngle,finalAngle); //2 * PI = 360deg
  ctx.fill();
  ctx.stroke();
  //display label
  var fontSize = (gridWidth/2)*1/1.8 ;  // radius / 1.8;
  ctx.font = fontSize+"px Comic Sans MS";
  ctx.fillStyle = nodeLabelColor;
  ctx.textAlign = "center";
  ctx.fillText(prompt('name of the node','node'), node.centerX, node.centerY);

}


function newNode(x,y){
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
            z:rect.left
         }
}


//add event listenter for creating nodes
cvs.addEventListener('mousedown',createNode);






displayGrid();
createNode();
//createNode();
