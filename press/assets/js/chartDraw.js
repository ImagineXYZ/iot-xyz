//Función para obtener la información de la base de datos
function getData(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
    req.setRequestHeader('accept', 'application/json');  
  }; 
  $.ajax({
    type: "GET",
    url: "pres",
    beforeSend: setHeader,
    success: function(res){
      drawChart(JSON.parse(res));
      getData2();//Función para obtener más datos del servidor
    }
  });
};

//Segunda llamada al servidor
function getData2(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
    req.setRequestHeader('accept', 'application/json'); 
  }; 
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: "press",
    beforeSend: setHeader,
    success: function(res){
      drawChart2(res);
    }
  });
};

//Módulo de google que hay q cargar
google.load("visualization", "1", {packages:["corechart", "imagechart", "gauge"]});

//Función que arma los datos en el gráfico y lo despliega, el parametro es lo q me retornó el servidor

function drawChart(dataJson) {
  if(dataJson.status){
    alert("PUNTAJE MÁXIMO. FELICIDADES");
  }
  var difficultyLabel = document.getElementById('difficultyLabel');
  difficultyLabel.innerHTML = dataJson.difficulty*100;
  var rangeLabel = document.getElementById('rangeLabel');
  rangeLabel.innerHTML = '+-'+dataJson.extra;
}

//Segunda función para dibujar el gráfico
function drawChart2(dataJson) {
  var data = google.visualization.arrayToDataTable([
    ['ID', 'X', 'Presión', 'Presión', 'Presión'],
    ['G1',   1,  dataJson[1].goal,  dataJson[1].goal, dataJson[1].goal],
    ['U1',   1,  dataJson[1].press,  dataJson[1].press, dataJson[1].press],
    ['G2',   2,  dataJson[2].goal,  dataJson[2].goal, dataJson[2].goal],
    ['U2',   2,  dataJson[2].press,  dataJson[2].press, dataJson[2].press],
    ['G3',   3,  dataJson[3].goal,  dataJson[3].goal, dataJson[3].goal],
    ['U3',   3,  dataJson[3].press,  dataJson[3].press, dataJson[3].press],
    ['G4',   4,  dataJson[4].goal,  dataJson[4].goal, dataJson[4].goal],
    ['U4',   4,  dataJson[4].press,  dataJson[4].press, dataJson[4].press],
    ['G5',   5,  dataJson[5].goal,  dataJson[5].goal, dataJson[5].goal],
    ['U5',   5,  dataJson[5].press,  dataJson[5].press, dataJson[5].press]
  ]);

  var options = {
    colorAxis: {colors: ['green', 'blue']}
  };

  var chart = new google.visualization.BubbleChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  setTimeout(getData, 200);
}
