//Función para obtener la información de la base de datos
function getData(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
    req.setRequestHeader('accept', 'application/json');  
  }; 
  $.ajax({
    type: "GET",
    url: "ultra",
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
    url: "ultras",
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
  var oldData = google.visualization.arrayToDataTable([
    ['Jugador', 'Meta'],
    ['Uno', dataJson[1].goal],
    ['Dos', dataJson[2].goal],
    ['Tres', dataJson[3].goal],
    ['Cuatro', dataJson[4].goal],
    ['Cinco', dataJson[5].goal]
  ]);

  var newData = google.visualization.arrayToDataTable([
    ['Jugador', 'Usuario'],
    ['Uno', dataJson[1].ultra],
    ['Dos', dataJson[2].ultra],
    ['Tres', dataJson[3].ultra],
    ['Cuatro', dataJson[4].ultra],
    ['Cinco', dataJson[5].ultra]
  ]);

  var colChartDiff = new google.visualization.ColumnChart(document.getElementById('chart_div'));

  var options = { 
    diff: {  
      newData: {widthFactor: 0.8} 
    } 
  };


  var diffData = colChartDiff.computeDiff(oldData, newData);
  colChartDiff.draw(diffData, options);
  
  setTimeout(getData, 200);
}
