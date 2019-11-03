var nodeList = new Array();   // arrey of object to store the information of each and every created node
var temp;
var count = 0;
var style = {fillColor : nodeFillColor ,strokeColor : nodeStrokeColor ,labelColor: nodeLabelColor };

var selectedNode =[{}]; //stores an object
displayGrid();



//cvs.addEventListener('mousedown',createEdge);
cvs.addEventListener('mousedown',function(event){
  var radioChecked = document.querySelector('input:checked').value;
  var pos = getMousePos(cvs,event);
  var nodePosition = getCenterPos(pos.x,pos.y); //return the center of the grid for corresponding x,y
  var nodeInGrid = false;


  for (var i = 0 ; i < nodeList.length ; i++){
    if ((Math.floor(nodePosition.centerX/gridWidth) == nodeList[i]["x"]) && (Math.floor(nodePosition.centerY/gridHeight) == nodeList[i]["y"]) ){
//Math.floor(node.centerX/gridWidth) is used to convert pixel value into grid value
         nodeInGrid = true;

    }
  }


if ( radioChecked == 'node' ){
         if (nodeInGrid == false){
                 label = ++count;
              //   style = {fillColor :nodeFillColor ,strokeColor :nodeStrokeColor ,labelColor:nodeLabelColor};


              setDefaultStyle(style);
               temp = createNode(event,nodePosition,label,style,true); //true indicates animation is on
               nodeList.push(temp);
           }
        else if (nodeInGrid == true){
          displaySelectedNode(event,nodePosition,style,false);
      //     createNode(event,nodePosition,label,style,false);

        }
}

else if(nodeInGrid == true && radioChecked == 'edge' ){ //create edge if radio edge  is checked and selected grid contains node
  createEdge(event);
}
else{
  alert('error');
}
},false);





function displaySelectedNode(event,nodePosition,style,animation){
   var name;
  if (Object.keys(selectedNode[0]).length == 0 ){ // if node isnot selected yet
    //console.log('new');

//getting previous label value
         for (var i = 0 ; i < nodeList.length ; i++){
            //   console.log(nodeList[i].x + ', ' +nodeList[i].y);
          //     console.log(Math.floor(nodePosition.centerX/gridWidth) == nodeList[i].x);
          //     console.log(Math.floor(nodePosition.centerY/gridHeight));
          if((nodeList[i].x == Math.floor(nodePosition.centerX/gridWidth)) && (nodeList.y == Math.floor(nodePosition.centerY/gridHeight)) )
              {
                console.log('dsasadasadsa');
                 name = nodeList[i].label;
                 console.log('0'+name);
              }
            }
   //console.log('1'+name);

    setSelectStyle(style);
    var temp = createNode(event,nodePosition,name,style,animation);
    selectedNode[0] = {x: temp.x , y: temp.y , label : name};
   //console.log(selectedNode[0]);

     }
 else if ((Math.floor(nodePosition.centerX/gridWidth) == selectedNode[0]["x"]) && (Math.floor(nodePosition.centerY/gridHeight) == selectedNode[0]["y"])){ //toggle if already selected node is selected
   //console.log(selectedNode[0]);
       setDefaultStyle(style);
       createNode(event,nodePosition,selectedNode[0].label,style,animation);
       selectedNode[0] = {};
 }
 else{

 }
}

function setDefaultStyle(style){
  style.fillColor = nodeFillColor ;
  style.strokeColor =nodeStrokeColor ;
  style.labelColor=nodeLabelColor ;
}
function setSelectStyle(style){
  style.fillColor = 'black' ;
  style.strokeColor ='red' ;
  style.labelColor='white' ;

}
