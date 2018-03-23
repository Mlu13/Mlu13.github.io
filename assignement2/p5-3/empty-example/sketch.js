var table;
var nameArray = [];
var worthArray = [];
var rankArray = [];
var worthMax = 0;
var worthMin = 0;
var rankMax = 0;
var rankMin = 1;
var yUnit = 0;
var yPix = 0;
var xPix = 0;
var ytick = 0;


function preload() {
  table = loadTable('billionairesSubset.csv', 'csv', 'header');
}

function setup() {
  // put setup code here
  createCanvas(2000, 720);
  background(255);
  textAlign(CENTER);

  rowCount = table.getRowCount();
  colCount = table.getColumnCount();
  // print(rowCount + 'total rows');
  // print(colCount + 'total column');
  
  //textAlign(CENTER,CENTER);
  worthMax = 0;
  for(var i = 0;i < table.getRowCount();i++){
    nameArray[i] = table.getString(i,"name");
    worthArray[i] = table.getNum(i,"worth in billions");
    rankArray[i] = table.getNum(i, "rank");   
    // print(worthArray[i]);
    // print(nameArray[i]);
    // print(rank[i]);
   
  }
  
  worthMax = Math.max.apply(Math,worthArray);
  worthMin = Math.min.apply(Math, worthArray);
  // print(worthMax);
  // print(worthMin);
  rankMax = Math.max.apply(Math, rankArray);
  rankMin = Math.min.apply(Math, rankArray);
}

function draw() {
  // put drawing code here
  background(255);
  
  line(200, 600, 1400, 600);
  text("Rank", 600, 750);
  line(200, 10, 200, 600);
  text("Worth in billion", 70, 230);
  yUnit = worthMax/10;

  yPix = (600-20)/10;
  ytick = 10;
  xPix = (1400-200)/20;
  
  //show 横线
  for(var i = 0; i <11; i ++){
  	line(200, 600 - i * (600-20)/10, 1400, 600 - i * (600-20)/10);
    // var l = map(worthArray[i], worthMin,worthMax, 600, 20 );
    //text(Number.parseFloat((i*yUnit).toFixed(2)), 200-20, 600 - i*yPix);
    text(nfc(i*yUnit,2), 200-20, 600 - i*yPix);
    // text(nfc(i*yUnit,2), 200-20, 600-i*l);
 
  }
  // print(rankMin);
  // print(rankMax);
  console.log(rankArray.length);
  for(var j = 0; j <= rankArray.length; j++){
  	 //text(int(rankMin + j * (rankMax-rankMin)/20), 260 + j * xPix, 600 + 50);
     text(int( j * (rankMax)/20), 200 + j * xPix, 600 + 50);

  	

  }
  for (var v = 0; v < rankArray.length; v++){
     var x = map(rankArray[v], 0, rankMax, 200, 1400);

     var y = map(worthArray[v], 0, worthMax, 600, 20);
     ellipse(x , y , 10, 10);
     
     if(dist(x,y,mouseX, mouseY) < 10){
      text("worth: " + worthArray[v], x, y);
      text("rank: " + rankArray[v], x, y+20);
      text('name: ' + nameArray[v], x, y+ 40);
     }

    
  }
  
}
  








