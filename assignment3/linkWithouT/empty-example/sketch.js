var table;
var vertice = [];
var obArr = [];
var rowCount = 0;
var wdith = 0;
var height = 0;
var newob = 0;
var edgeArr = [];
var xpoCount = [];


function preload() {
  table = loadTable('3980edges.csv', 'csv');
}

function Node(idNum){
      this.xpos = 0;
      this.ypos = 0;
      this.xdisp = 0;
      this.ydisp = 0;
      this.idNum = idNum;

}

function Edge(v1,v2) {
  
    this.v1 = v1;
    this.v2 = v2;
  
}


function setup() {
  // put setup code here
  createCanvas(1120, 1120);
  background(255);
 
  for(var i = 0; i < table.getRowCount(); i++){

    for(var j = 0; j < table.getColumnCount(); j++){
      
      if(!vertice.includes(table.getNum(i,j))){
        vertice.push(table.getNum(i,j));
        //create node object
        var newob = new Node(table.getNum(i,j));
        obArr.push(newob);

      }
    }
    //create edge object edge(v1,v2)
    var newEdge = new Edge(table.getNum(i,0), table.getNum(i,1));
    edgeArr.push(newEdge);
 
  }
  
}

function draw() {
  // put drawing code here
  background(255);
  fill(0);
  for (var i = 0; i < vertice.length; i++){
    for(var j = 0; j < vertice.length; j++){
      //create the grid
    

      var x = 80 + i*1000/vertice.length; //actual should be num pixel for each node = canvas width/# of node
      var y = 80 + j*1000/vertice.length;
      // console.log(x);
      // console.log(y);
      
      obArr[i].xpos = x;

      obArr[j].ypos = y;
      
      stroke(0);
      fill(255);
      rect(x,y,1000/vertice.length,1000/vertice.length);
      fill(255);
      text(vertice[i], x,60,1000/vertice.length, 1000/vertice.length);
      text(vertice[j], 40 ,y+5,1000/vertice.length, 1000/vertice.length);
      textSize(7.5);


    }
   
  }
   
  for(var i = 0; i < edgeArr.length; i++){
    //find v1,v2 in each edge object
    var edv1 = edgeArr[i]['v1'];
    var edv2 = edgeArr[i]['v2'];
    //find v1,v2's location in vertice
    var index1 = vertice.indexOf(edv1);
    var index2 = vertice.indexOf(edv2);
    //since obArr & vertice are created at the same time, order is the same
    //find v1's position & v2's position in object
    //v1 position

    var v1xpo = obArr[index1]['xpos'];
    var v1ypo = obArr[index1]['ypos'];
    //print(obArr[0]['xpos']);
  
    //   // //v2 position

    var v2xpo = obArr[index2]['xpos'];
    var v2ypo = obArr[index2]['ypos'];
    //create rectangle at the right spot and fill it. 

    fill(255,204,0);
    rect(v1xpo,v2ypo, 1000/vertice.length, 1000/vertice.length);
    rect(v2xpo, v1ypo, 1000/vertice.length, 1000/vertice.length);
    
    if(mouseX > v1xpo && mouseY > v2ypo 
      && mouseX < v1xpo+1000/vertice.length && mouseY < v2ypo + 1000/vertice.length){
      // fill('green');
      //print('in')
      // rect(v1xpo,v2ypo, 1000/vertice.length, 1000/vertice.length);
      // rect(v2xpo, v1ypo, 1000/vertice.length, 1000/vertice.length);
      fill('black');
      var mesg = 'v1: ' + obArr[index1]['idNum'] + ' v2: ' + obArr[index2]['idNum'];
      text(mesg, mouseX + 20 , mouseY + 20);
    }
  }
 
  
}








