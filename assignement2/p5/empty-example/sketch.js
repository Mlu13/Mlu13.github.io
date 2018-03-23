var table;
var radio;
var rowCount;
var colCount; 

var worthArray = [];
var nameArray = [];
var worthMax = 0;
var yUnit;
var xUnit;
var xPix = 0;
var ypix = 0;



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
    nameArray[i] = table.getString(i,12);
    worthArray[i] = table.getNum(i,20);
    
  
    // print(worthArray[i]);
    // print(nameArray[i]);
  }
  
  worthMax = Math.max.apply(Math,worthArray);
 

}



function draw() {
  background(255);
  text('(The dataset was modified since the original dataset is too large.)', 350, 530);
  //x-axis: x1 = 200, y1 = 400, x2 = 900, y2 = 400
  line(200, 400, 1200, 400);
  text('Name', 600, 500);
  //y-axis: x1 = 200, y1 = 100, x2 = 200, y2 = 400
  line(200, 100, 200, 400);
  text('Worth in billion', 70, 230);

  yUnit = worthMax/5;
  ypix = (400-100)/5;
  xPix = (1200-200)/10;


  for(var l = 0; l < nameArray.length ; l++){
   

    var bname = table.getString(l,12);

    text(bname, 200 + (2 * l + 1) * 100, l + 450); 
    rect(200 + (2*l+1) * 100 , 400, xPix, - worthArray[l]/worthMax * 300 );
    fill(100, 100);
    textSize(15);
    // print("ss")
    if(mouseX > 200 + (2*l+1) * xPix 
      && mouseY < 400
      && mouseX < 200 + (2*l+2) * xPix
      && mouseY > 400 - worthArray[l]/worthMax * 300)
    {
      text(worthArray[l], mouseX, mouseY);
      fill(200);

    }

      //label y-axis
    for(var i = 0; i <= 5; i++){
      text(i * yUnit, 200 - 30, 400 - 60 * i);
      

    }

     

    }    


    
  }
  
