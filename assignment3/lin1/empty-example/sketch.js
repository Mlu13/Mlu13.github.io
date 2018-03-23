  var table;
  var vertice = []; // int id's
  var obArr = []; // object
  var rowCount = 0;
  var wdith = 0;
  var height = 0;
  var newob = 0;
  var edgeArr = [];
  var v1xpo = 0;
  var v1ypo = 0;
  var v2xpo = 0;
  var v2ypo = 0;
  var numIte = 5;
  var xTempNum = 0;
  var yTempNum = 0;
  var diff1 = 0;
  var diff2 = 0;
  var diff3 = 0;
  var diff4 = 0;






  function preload() {
    table = loadTable('3980edges.csv', 'csv');
  }

  function Node(idNum){
    this.xpos = Math.floor(Math.random()*1000);
    this.ypos = Math.floor(Math.random()*1000);
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
    // noLoop();
    background(255);
    //console.log("pass"); //check
    
    for(var i = 0; i < table.getRowCount(); i++){

      for(var j = 0; j < table.getColumnCount(); j++){

        if(!vertice.includes(table.getNum(i,j))){
          vertice.push(table.getNum(i,j));
          //create node object
          var newob = new Node(table.getNum(i,j));
          obArr.push(newob);
          //print(newob.xpos+" and "+newob.ypos);

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
    // fill(0);
    //draw circle

    for(var i = 0; i < obArr.length; i++){
      fill('green');
      ellipse(obArr[i].xpos  + 50, obArr[i].ypos + 50, 10, 10);

      //here is interaction code, but it doesn't
      // if(dist(obArr[i].xpos, obArr[i].ypos, mouseX, mouseY) < 10){
      //   fill('orange');
      //   text(obArr[i].idNum, obArr[i].xpos + 10, obArr[i].ypos + 10);
      // }
      //print(obArr[i].xpos);

    }


    for(var i = 0; i < edgeArr.length; i++){
      var id1 = edgeArr[i]['v1'];
      var id2 = edgeArr[i]['v2'];

      var indexv1 = vertice.indexOf(id1);
      var indexv2 = vertice.indexOf(id2);

      var id1xpos = obArr[indexv1].xpos + 50;
      var id1ypos = obArr[indexv1].ypos + 50;

      var id2xpos = obArr[indexv2].xpos + 50;
      var id2ypos = obArr[indexv2].ypos + 50;

      stroke('red');
      line(id1xpos  , id1ypos , id2xpos , id2ypos );

    }
    
    
  // }

    // //create interaction
    // for(var j = 0; j < obArr.length; j++){
    //   if(dist(obArr[j].xpos, obArr[j].ypos, mouseX, mouseY) < 10){
    //     fill('orange');
    //     text(obArr[j]['idNum'], obArr[j].xpos + 10, obArr[j].ypos + 10);

    // }

    width = 1000;
    height = 1000;
    
    var area = width * height;
    //print('area is ' + area);

    var k = Math.sqrt(area/Math.abs(obArr.length));
    //print('k value is ' + k);
  
    function fa(x){
      return x^2/k;
    }
    //print('fa func value ' + fa(10));

    function fr(z){
      return k^2/z;
    }

    for(var i = 0; i < 3; i++){
      //set v1.xdisp, v1.ydisp = 0
      for(var v = 0; v < obArr.length; v++){
        // if(obArr[i].xdisp == 0 && obArr[i].ydisp == 0){
          obArr[v].xdisp = 0;
          obArr[v].ydisp = 0 ;

          for(var u = 0; u < obArr.length; u++){

            if(obArr[u].idNum  != obArr[v].idNum){
              diff1 = (obArr[v].xpos - obArr[u].xpos);
            //print('check diff1 pass');
            }

            diff2 = (obArr[v].ypos - obArr[u].ypos);
            //print('check diff2 pass');
            
            if(diff1 != 0 ){
                //diff1 = 0.000001;
                obArr[v].xdisp = (obArr[v].xdisp + (diff1/Math.abs(diff1))*fr(Math.abs(diff1)));
              }
            if(diff2 != 0 ){
                //diff2 = 0.000001;
              obArr[v].ydisp = (obArr[v].ydisp + (diff2/Math.abs(diff2))*fr(Math.abs(diff2)));
            }

          }

        }      
       
      for(var l = 0; l < edgeArr.length; l++){
          var ev1 = edgeArr[l]['v1']; 
          var indexv1 = vertice.indexOf(ev1);

          var ev2 = edgeArr[l]['v2'];
          var indexv2 = vertice.indexOf(ev2);

          diff3 = (obArr[indexv1].xpos - obArr[indexv2].xpos);
          diff4 = (obArr[indexv1].ypos - obArr[indexv2].ypos);

          if(diff3 != 0 ){
          //diff3 = 0.000001
            obArr[indexv1].xdisp = (obArr[indexv1].xdisp - (diff3/Math.abs(diff3)) * fa(Math.abs(diff3)));
            obArr[indexv1].ydisp = (obArr[indexv1].ydisp - (diff4/Math.abs(diff3)) * fa(Math.abs(diff3)));
          }
          if(diff4 != 0 ){
          //diff4 = 0.000001;
            obArr[indexv2].xdisp = (obArr[indexv2].xdisp - (diff3/Math.abs(diff4)) * fa(Math.abs(diff4)));
            obArr[indexv2].ydisp = (obArr[indexv2].ydisp - (diff4/Math.abs(diff4)) * fa(Math.abs(diff4)));
          } 
        }

      for(var m = 0; m < obArr.length; m++){
        obArr[m].xpos = obArr[m].xpos + obArr[m].xdisp/Math.abs(obArr[m].xdisp)*Math.min(obArr[m].xdisp,t);
        obArr[m].ypos = obArr[m].ypos + obArr[m].ydisp/Math.abs(obArr[m].ydisp)*Math.min(obArr[m].ydisp,t);

        // obArr[m].xpos = obArr[m].xpos + obArr[m].xdisp/Math.abs(obArr[m].xdisp);
        // obArr[m].ypos = obArr[m].ypos + obArr[m].ydisp/Math.abs(obArr[m].ydisp);

        obArr[m].xpos = Math.min(1000 - 10, Math.max(10, obArr[m].xpos));
        obArr[m].ypos = Math.min(1000 - 10, Math.max(10, obArr[m].ypos));
      }  
    t *= (1 - i/numIte);
  }
  //}  

}

// }












