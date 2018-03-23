var table;
var nameArray = [];
var worthArray = [];
var rankArray = [];
var ageArray = [];
var maxAge;
var minAge;
var maxWorth;
var minRank;
var maxRank;


function preload() {
  table = loadTable('billionairesSubset.csv', 'csv', 'header');
}

function setup() {
  // put setup code here
  createCanvas(2000, 800);
  background(255);
  textAlign(CENTER);
  maxAge = 0;
  minAge = 0;
  for(var i = 0;i < table.getRowCount();i++){
    nameArray[i] = table.getString(i,"name");
    worthArray[i] = table.getNum(i,"worth in billions");
    rankArray[i] = table.getNum(i,"rank");
    ageArray[i] = table.getNum(i,"age");
    if(i == 0){
      maxRank = rankArray[i];
      minRank = rankArray[i];
      maxWorth = 0;
    }
    if(ageArray[i] != -1 && maxAge == 0 && minAge == 0){
      maxAge = ageArray[i];
      minAge = ageArray[i];
    }
    if(worthArray[i] > maxWorth)
      maxWorth = worthArray[i];
    if(maxRank < rankArray[i])
      maxRank = rankArray[i];
    if(minRank > rankArray[i])
      minRank = rankArray[i];
    if(minAge > ageArray[i] && ageArray[i] != -1)
      minAge = ageArray[i];
    if(maxAge < ageArray[i] && ageArray[i] != -1)
      maxAge = ageArray[i];
  }
}

function draw() {
  // put drawing code here
  background(255);
  //text("Wealth & Rank", width / 2, height / 20);
  text("(The dataset was modified since the original dataset is too large)", 650, 720);
  line(200, 600, 1400, 600);
  text("Rank", 600, 700);
  line(200, 10, 200, 600);
  text("Worth in billion", 70, 230);
  text("Red: age <= 25", 100, 30);
  text("Green: 25 < age < 50 ", 105,50);
  text("Blue: age >= 50 ", 110,70);
  text("Yellos: age = -1", 115, 90);

  yUnit = maxWorth/10;
  yPix = (600-20)/10;
  ytick = 10;
  xPix = (1400-200)/20;

  for(var i = 0; i < 11; i ++){
    line(200, 600 - i * (600-20)/10, 1400, 600 - i * (600-20)/10);
   
    text(nfc(i*yUnit,2), 200-20, 600 - i*yPix);
   
 
  }

  for(var j = 0; j <= rankArray.length; j++){
    
     text(int(j * (maxRank)/20), 200 + j * xPix, 600 + 50);

  
  }
  console.log(minAge);
  console.log(maxAge);
  for(var v = 0; v < rankArray.length; v++){
    var x = map(rankArray[v], 0, maxRank, 200, 1400);
    var y = map(worthArray[v], 0, maxWorth, 600, 20);
    //var a = map(ageArray[v], minAge, maxAge, )
    // if(dist(mouseX,mouseY, x, y) < 10){

    // }

    
    if(ageArray[v] <= 25 && ageArray[v] != -1 ){
      fill("red");
      ellipse(x,y,10,10);
      if(dist(mouseX,mouseY, x, y) < 10){
        text("Age: " + ageArray[v], x , y -10);
      text("Rank: " + rankArray[v], x, y -20);
      text("Worth: " + worthArray[v],x, y-30);
      }
      
    }
    else if(ageArray[v] <= 50 && ageArray[v] != -1 ){
      fill("green");
      ellipse(x,y,10,10);
      if(dist(mouseX,mouseY, x, y) < 10){
        text("Age: " + ageArray[v], x , y -10);
      text("Rank: " + rankArray[v], x, y -20);
      text("Worth: " + worthArray[v],x, y-30);
      }
      // text("Age: " + ageArray[v], x , y -10);
      // text("Rank: " + rankArray[v], x, y -20);
      // text("Worth: " + worthArray[v],x, y-30);
    }else if(ageArray[v] > 50 && ageArray[v] != -1 ){
      fill("blue" );
      ellipse(x,y,10,10);
      if(dist(mouseX,mouseY, x, y) < 10){
        text("Age: " + ageArray[v], x , y -10);
      text("Rank: " + rankArray[v], x, y -20);
      text("Worth: " + worthArray[v],x, y-30);
      }
      // text("Age: " + ageArray[v], x , y -10);
      // text("Rank: " + rankArray[v], x, y -20);
      // text("Worth: " + worthArray[v],x, y-30);
    }
    else if(ageArray[v] == -1 ){
      fill("purple");
      ellipse(x,y,10,10);
      if(dist(mouseX,mouseY, x, y) < 10){
        text("Age: " + ageArray[v], x , y -10);
      text("Rank: " + rankArray[v], x, y -20);
      text("Worth: " + worthArray[v],x, y-30);
      }
      // text("Age: " + ageArray[v], x , y -10);
      // text("Rank: " + rankArray[v], x, y -20);
      // text("Worth: " + worthArray[v],x, y-30);

    }
    // ellipse(x,y,10,10);
    fill("black");
   
  }

  


}