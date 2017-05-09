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
      drawChart1(res);
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
      getData3();//Función para obtener más datos del servidor
    }
  });
};

//Tercera llamada al servidor
function getData3(){  
  var setHeader = function (req) {
    req.setRequestHeader('content-type', 'application/json'); 
    req.setRequestHeader('accept', 'application/json'); 
  }; 
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: "ultra",
    beforeSend: setHeader,
    success: function(res){
      drawChart3(res);
    }
  });
};

//Módulo de google que hay q cargar
google.load("visualization", "1", {packages:["corechart", "imagechart", "gauge"]});

//Función que arma los datos en el gráfico y lo despliega, el parametro es lo q me retornó el servidor

//Primera función para dibujar el gráfico
function drawChart1(dataJson) {
  var data1 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Jugador1', dataJson[1].temp]
  ]);
  var data2 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Jugador2', dataJson[2].temp]
  ]);

  var options1 = {
    width: 500, height: 150,
    greenFrom: 0, greenTo: 30,
    redFrom: 70, redTo: 130,
    yellowFrom: 30, yellowTo: 70,
    minorTicks: 5,
    greenColor: "#48B8FF",
    yellowColor: "#0CB211",
    redColor : "#FF2903"
  };

  var options2 = {
    width: 500, height: 150,
    greenFrom: 0, greenTo: 75,
    redFrom: 90, redTo: 130,
    yellowFrom: 75, yellowTo: 90,
    minorTicks: 5,
    greenColor: "#48B8FF",
    yellowColor: "#0CB211",
    redColor : "#FF2903"
  };

  var chart1 = new google.visualization.Gauge(document.getElementById('chart1_div'));
  var chart2 = new google.visualization.Gauge(document.getElementById('chart2_div'));

  chart1.draw(data1, options1);
  chart2.draw(data2, options2);
}

//Segunda función para dibujar el gráfico
function drawChart2(dataJson) {
  var data = google.visualization.arrayToDataTable([
    ['ID', 'X', 'Presión', 'Presión', 'Presión'],
    ['G1',   1,  860,  860, 860],
    ['U1',   1,  dataJson[1].press,  dataJson[1].press, dataJson[1].press],
    ['G2',   2,  900,  900, 900],
    ['U2',   2,  dataJson[2].press,  dataJson[2].press, dataJson[2].press]
  ]);

  var options = {
    colorAxis: {colors: ['green', 'blue']}
  };

  var chart = new google.visualization.BubbleChart(document.getElementById('chart3_div'));
  chart.draw(data, options)
}

//Tercera función para dibujar el gráfico
function drawChart3(dataJson) {
  var oldData = google.visualization.arrayToDataTable([
    ['Jugador', 'Meta'],
    ['Uno', 20],
    ['Dos', 50]
  ]);

  var newData = google.visualization.arrayToDataTable([
    ['Jugador', 'Usuario'],
    ['Uno', dataJson[1].ultra],
    ['Dos', dataJson[2].ultra]
  ]);

  var colChartDiff = new google.visualization.ColumnChart(document.getElementById('chart4_div'));

  var options = { 
    diff: {  
      newData: {widthFactor: 0.8} 
    } 
  };


  var diffData = colChartDiff.computeDiff(oldData, newData);
  colChartDiff.draw(diffData, options);

   $("text").each(function () {
      if ($(this).text() == "Previous") {
        $(this).text('Meta');
      } 
      else if ($(this).text() == "data") {
        $(this).text('');
      } 
    });

  setTimeout(getData, 200);
}
