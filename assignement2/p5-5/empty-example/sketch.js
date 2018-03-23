var table;
var nameArray = [];
var worthArray = [];
var rankArray = [];
var ageArray = [];
var yearArray = [];

var maxAge;
var minAge;
var maxWorth;
var minRank;
var maxRank;

var maxAge01;
var minAge01;
var maxWorth01;
var minRank01;
var maxRank01;


var maxAge14;
var minAge14;
var maxWorth14;
var minRank14;
var maxRank14;
//maxWealth1

function preload() {
  table = loadTable('index.csv', 'csv', 'header');
}


function setup() {
  // put setup code here
  createCanvas(2000,2000);
  background(225);
  textAlign(CENTER);
  maxAge = 0;
  minAge = 0;
  maxAge1 = 0;
  minAge1 = 0;
  var t = true;
  var t1 = true;
  for (var i = 0; i < table.getRowCount(); i++) {
    nameArray[i] = table.getString(i, "name");
    worthArray[i] = table.getNum(i, "worth in billions");
    rankArray[i] = table.getNum(i, "rank");
    //ageArray[i] = table.getNum(i, "age");
    yearArray[i] = table.getNum(i, "year");
    if (yearArray[i] == 1996) {
      if (i == 0) {
        maxRank = rankArray[i];
        minRank = rankArray[i];
        maxWorth = 0;
      }
      if (ageArray[i] != -1 && maxAge == 0 && minAge == 0) {
        maxAge = ageArray[i];
        minAge = ageArray[i];
      }
      if (worthArray[i] > maxWorth)
        maxWorth = worthArray[i];
      if (maxRank < rankArray[i])
        maxRank = rankArray[i];
      if (minRank > rankArray[i])
        minRank = rankArray[i];
      // if (minAge > ageArray[i] && ageArray[i] != -1)
      //  minAge = ageArray[i];
      // if (maxAge < ageArray[i] && ageArray[i] != -1)
      //  maxAge = ageArray[i];
      // print(rank[i]);
      // print(wealth[i]);
      // print(names[i]);
      // print(age[i]);
      //print(years[i]);
    }else if (yearArray[i] == 2001) {
      if (t) {
        maxRank01 = rankArray[i];
        minRank01 = rankArray[i];
        maxWorth01 = 0;
        t = false;
      }
    // if (ageArray[i] != -1 && maxAge01 == 0 && minAge01 == 0) {
    //  maxAge01 = ageArray[i];
    //  minAge01 = ageArray[i];
    // }
      if (worthArray[i] > maxWorth01)
        maxWorth01 = worthArray[i];
      if (maxRank01 < rankArray[i])
        maxRank01 = rankArray[i];
      if (minRank01 > rankArray[i])
        minRank01 = rankArray[i];
    // if (minAge01 > ageArray[i] && ageArray[i] != -1)
    //  minAge01 = ageArray[i];
    // if (maxAge01 < ageArray[i] && ageArray[i] != -1)
    //  maxAge01 = ageArray[i];
      // print(rank[i]);
      // print(wealth[i]);
      // print(names[i]);
      // print(age[i]);
      // print(years[i]);

  }else {
    if (t1) {
      maxRank14 = rankArray[i];
      minRank14 = rankArray[i];
      maxWorth14 = 0;
      t1 = false;
    }
    // if (ageArray[i] != -1 && maxAge14 == 0 && minAge14 == 0) {
    //  maxAge14 = ageArray[i];
    //  minAge14 = ageArray[i];
    // }
    if (worthArray[i] > maxWorth14)
      maxWorth14 = worthArray[i];
    if (maxRank14 < rankArray[i])
      maxRank14 = rankArray[i];
    if (minRank14 > rankArray[i])
      minRank14 = rankArray[i];
    // if (minAge14 > ageArray[i] && ageArray[i] != -1)
    //  minAge14 = ageArray[i];
    // if (maxAge14 < ageArray[i] && ageArray[i] != -1)
    //  maxAge14 = ageArray[i];
    }
}

}
console.log(yearArray.length);
function draw() {
  // put drawing code here
  background(225);
  //画三条x轴
  line(120, 600, 420, 600);
  line(500, 600, 800, 600);
  line(880, 600, 1180, 600);
  
  ygap = maxWorth/10;
  ygap1 = maxWorth01/10;
  ygap2 = maxWorth14/10;
  xgap = (420-120)/10;
  
  //标记y轴，
  for(var i =0; i <= 10; i++ ){
    text(nfc(i*ygap,2), 80, 600- 30*i);
    text(nfc(i*ygap1,2), 470, 600 - 30*i);
    text(nfc(i*ygap2,2), 840, 600 - 30*i); //not adding 14
  }
  //标记x轴
  for(var i = 0; i < 11; i++){
    var l = (maxRank - minRank)/(10);
    text(int(l*i+minRank), 120 + i*xgap,620);
    l = (maxRank01 - minRank01)/(10);
    text(int(l*i+minRank01), 500 +i*xgap, 620);
    l = (maxRank14 - minRank14)/(10);
    text(int(l*i+minRank14),880+i*xgap, 620);

  }
  
  text("1996",270,250);
  text("2001",650,250);
  text("2014",1030,250);

  for(var i = 0; i <rankArray.length; i++){
    // var d = map(ageArray[i], minAge, maxAge, 120, 240);
    var x;
    var y;
    if(yearArray[i] == 1996){
      x = map(rankArray[i], minRank, maxRank,120,420);
      y = map(worthArray[i], 0,maxWorth, 600 ,300);
    }else if(yearArray[i] == 2001){
      x = map(rankArray[i],minRank01, maxRank01, 500,800);
      y = map(worthArray[i], 0,maxWorth01,600 ,300);
    }else if(yearArray[i] == 2014){
      x = map(rankArray[i],minRank14, maxRank14, 880,1180);
      y = map(worthArray[i], 0,maxWorth14,600 ,300);
    }
    if(dist(mouseX, mouseY, x, y) < 10){
      if(ageArray[i] == -1){
        //text("Age: Unknown", x, y-20);
        text("Worth in billions: " + worthArray[i], x, y-40);
        text("rank: " + rankArray[i],x, y-60);
        text(nameArray[i], x, y - 80);

      }else{
        //text("Age: " + ageArray[i], x, y-20);
        text("Worth in billions: " + worthArray[i], x, y-40);
        text("rank: " + rankArray[i],x, y-60);
        text(nameArray[i], x, y - 80);
      }
    }
    ellipse(x,y,10,10)
  }

  






















}