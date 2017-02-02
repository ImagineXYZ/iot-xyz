//Función para obtener la información de la base de datos
function getData(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
    req.setRequestHeader('accept', 'application/json');  
  }; 
  $.ajax({
    type: "GET",
    url: "temp",
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
    url: "temps",
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
  var seconds = dataJson.time - Math.round(dataJson.left);
  var temp = document.getElementById('countdown');
  temp.innerHTML = seconds;
  var difficultyLabel = document.getElementById('difficultyLabel');
  difficultyLabel.innerHTML = dataJson.difficulty*100;
  var rangeLabel = document.getElementById('rangeLabel');
  rangeLabel.innerHTML = '+-'+dataJson.extra;
  var time = document.getElementById('timeLabel');
  timeLabel.innerHTML = dataJson.time + ' segundos';
}

//Segunda función para dibujar el gráfico
function drawChart2(dataJson) {
  var data1 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Jugador1', dataJson[1].temp]
  ]);
  var data2 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Jugador2', dataJson[2].temp]
  ]);
  var data3 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Jugador3', dataJson[3].temp]
  ]);

  var options1 = {
    width: 500, height: 150,
    greenFrom: 0, greenTo: dataJson[1].goal-dataJson.extra,
    redFrom: dataJson[1].goal+dataJson.extra, redTo: 130,
    yellowFrom:dataJson[1].goal-dataJson.extra, yellowTo: dataJson[1].goal+dataJson.extra,
    minorTicks: 5,
    greenColor: "#48B8FF",
    yellowColor: "#0CB211",
    redColor : "#FF2903"
  };

  var options2 = {
    width: 500, height: 150,
    greenFrom: 0, greenTo: dataJson[2].goal-dataJson.extra,
    redFrom: dataJson[2].goal+dataJson.extra, redTo: 130,
    yellowFrom:dataJson[2].goal-dataJson.extra, yellowTo: dataJson[2].goal+dataJson.extra,
    minorTicks: 5,
    greenColor: "#48B8FF",
    yellowColor: "#0CB211",
    redColor : "#FF2903"
  };

  var options3 = {
    width: 500, height: 150,
    greenFrom: 0, greenTo: dataJson[3].goal-dataJson.extra,
    redFrom: dataJson[3].goal+dataJson.extra, redTo: 130,
    yellowFrom:dataJson[3].goal-dataJson.extra, yellowTo: dataJson[3].goal+dataJson.extra,
    minorTicks: 5,
    greenColor: "#48B8FF",
    yellowColor: "#0CB211",
    redColor : "#FF2903"
  };

  var chart1 = new google.visualization.Gauge(document.getElementById('chart1_div'));
  var chart2 = new google.visualization.Gauge(document.getElementById('chart2_div'));
  var chart3 = new google.visualization.Gauge(document.getElementById('chart3_div'));

  chart1.draw(data1, options1);
  chart2.draw(data2, options2);
  chart3.draw(data3, options3);

  setTimeout(getData, 200);
}