var table;
var nameArray = [];
var worthArray = [];
var rankArray = [];
var GDP = [];
var maxGDP;
var minGDP;
var maxWorth;
var minRank;
var maxRank;

function preload() {
  table = loadTable('billionairesSubset.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1100, 950);
  background(255);
  // textAlign(CENTER);
  for(var i = 0; i < table.getRowCount(); i++){
    nameArray[i] = table.getString(i, "name");
    worthArray[i] = table.getNum(i, "worth in billions");
    rankArray[i] = table.getNum(i, "rank");
    GDP[i] = table.getNum(i, "gdp") / 10000000000.0;
    if(i == 0){
      maxRank = rankArray[i];
      minRank = rankArray[i];
      maxWorth = 0;
      maxGDP = GDP[i];
      minGDP = GDP[i];
    }
    if(worthArray[i] > maxWorth)
      maxWorth = worthArray[i];
    if(maxRank < rankArray[i])
      maxRank = rankArray[i];
    if(minRank > rankArray[i])
      minRank = rankArray[i];
    if(minGDP > GDP[i])
      minGDP = GDP[i];
    if(maxGDP < GDP[i])
      maxGDP = GDP[i];
    // print(rank[i]);
    // print(wealth[i]);
    // print(names[i]);
    // print(GDP[i]);
  }
  // print(maxWealth);
  // print(maxRank);
  // print(minRank);
  // print(maxGDP);
  // print(minGDP);
}

function draw() {
  background(255);
  //textSize(height / 30);
  fill(0);
  text("Worth & Rank & GDP", width / 2, height / 20);
  
  var w = 300;
  var h = 200;
  
  scatterPlot(200, 200, w, h, worthArray, maxWorth, 0, "worth", worthArray, maxWorth, 0, "worth");
  scatterPlot(550, 200, w, h, rankArray, maxRank, minRank, "rank", worthArray, maxWorth, 0, "worth");
  scatterPlot(900, 200, w, h, GDP, maxGDP, minGDP, "GDP", worthArray, maxWorth, 0, "worth");
  
  scatterPlot(200, 500, w, h, worthArray, maxWorth, 0, "worth", rankArray, maxRank, minRank, "rank");
  scatterPlot(550, 500, w, h, rankArray, maxRank, minRank, "worth", rankArray, maxRank, minRank, "rank");
  scatterPlot(900, 500, w, h, GDP, maxGDP, minGDP, "worth", rankArray, maxRank, minRank, "rank");
  
  scatterPlot(200, 800, w, h, worthArray, maxWorth, 0, "worth", GDP, maxGDP, minGDP, "GDP");
  scatterPlot(550, 800, w, h, rankArray, maxRank, minRank, "worth", GDP, maxGDP, minGDP, "GDP");
  scatterPlot(900, 800, w, h, GDP, maxGDP, minGDP, "worth", GDP, maxGDP, minGDP, "GDP");
}

//function to draw scatter plot, x,y = origin 
// x, y are the center of graph, w = the width, h = height, data0: data for y-axis, maxData0/minData0 = min&max for y-axis, name0 = name of y-axis, 
// 0 is use for y axis, 1 is use for x-axis
function scatterPlot(x, y, w, h, data0, maxData0, minData0, name0, data1, maxData1, minData1, name1){
  var gap0 = (maxData0 - minData0) / 10.0;
  var gap1 = (maxData1 - minData1) / 10.0;
  var iNumb = 10;
  fill(0);
  
  text(name0, x - 1.1* w / 2, y - 1.2 * h / 2);
  fill(0);
 
  text(name1, x + 1.2 * w / 2, y + 1.1 * h / 2);
  
  for (var i = 0; i < iNumb + 1; i++) {
    stroke(100, 100);
    line(x - w / 2, y - h / 2 + i * h / iNumb, x + w / 2, y - h / 2 + i * h / iNumb);
    fill(100, 100);
    
    text(nfc(minData0 + i * gap0, 2), x - 1.1 * w / 2, y + h / 2 - i * h / iNumb);
    
    text(nfc(minData1 + i * gap1, 2), x - 1 * w / 2 + i * w / iNumb, y + 1.1 * h / 2);
  }
  
  for(var i = 0;i < data1.length;i++){
    var x0 = x - w / 2 + map(data1[i], minData1, maxData1, 0, w);
    var y0 = y + h / 2 - map(data0[i], minData0, maxData0, 0, h);
    var d0 = h / 40;
    if(dist(mouseX, mouseY, x0, y0) < d0){
      fill(0);
      
      text(name0 + ": " + data0[i], x0, y0 - 40);
      text(name1 + ": " + data1[i], x0, y0 - 60);
      
      fill(255,0,0);
      noStroke();
    }else{
      fill(255, 0, 0, 100);
      noStroke();
    }
    ellipse(x0, y0, d0, d0);
  }
}