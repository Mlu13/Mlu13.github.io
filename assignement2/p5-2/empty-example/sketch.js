var table;
var radio;
var rowCount;
var colCount;

var worthArray = [];
var nameArray = [];
var worthMax = 0;
var yPix = 0;
var xPix = 0;
var yUnit = 0;

function preload() {
  table = loadTable('billionairesSubset.csv', 'csv', 'header');
 
}


function setup() {
  createCanvas(2000,2000);
  background(255);

  rowCount = table.getRowCount();
  colCount = table.getColumnCount();
  print(rowCount + 'total rows');
  print(colCount + 'total column');
  
  //textAlign(CENTER,CENTER);
  worthMax = 0;
  for(var i = 0;i < table.getRowCount();i++){
    nameArray[i] = table.getString(i,"name");
    worthArray[i] = table.getNum(i,"worth in billions");
   
    // print(worthArray[i]);
    // print(nameArray[i]);
  }
  
  worthMax = Math.max.apply(Math,worthArray);
  // print(worthMax);
  
}


function draw() {
  //put drawing code here
  background(255);
  //x-axis
  line(200, 400, 1200, 400);
  text("Name", 600, 500);
  //y-axis
  line(200, 100, 200, 400);
  text("Worth in billion", 70, 230);
  yUnit = worthMax/5;
  yPix = (400-100)/5;
  xPix = (1200-200)/worthArray.length;
  
  for(var i = 0; i < nameArray.length; i++){
  	var bname = table.getString(i,12);
    text(bname, 200 + (2 * i + 1 ) * 100, i + 450); 
    
    fill(100,100);
    
  }

  for(var v = 0; v <= nameArray.length; v++){
      text(v * yUnit, 200 - 30, 400 - 60 * v);
       //, 200, 400 - 60 * yv
    }

  for(var j = 0; j < nameArray.length; j++){
  	line(300+xPix+(j-1)*xPix, 400-worthArray[j]/worthMax*300, 300+xPix+(j)*xPix, 400-worthArray[j+1]/worthMax*300);
    ellipse(300+xPix+(j-1)*xPix, 400-worthArray[j]/worthMax*300, 10, 10);
    //line(200 , 400-worthArray[j]/worthMax*300, 200, 100);
    // print("not done");
    
    var d = dist(300+xPix+(j-1)*xPix, 400-worthArray[j]/worthMax*300,mouseX, mouseY);
  	if(d < 40){
      text(worthArray[j], 300+xPix+(j-1)*xPix, 400-worthArray[j]/worthMax*300);
      
    }
  }

 












}