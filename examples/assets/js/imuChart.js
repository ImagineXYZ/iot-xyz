function imuDraw() {

      var dpsx1 = [];
      var dpsx2 = []; 
      var dpsx3 = []; 

      var dpsa1 = [];
      var dpsa2 = []; 
      var dpsa3 = []; 
      var pos = 0;

      var chart1 = new CanvasJS.Chart("chartContainer1",{
      	title :{
      		text: ""
      	},
      	axisX: {						
      		title: "ID"
      	},
      	axisY:[
      	{
			title: "Gx",
			lineColor: "#3160BA",
			titleFontColor: "#3160BA",
			labelFontColor: "#3160BA",
                  minimum: -300,
                  maximum: 300
		// 338CC4 369EAD
		//[-2000, 2000]
		},
		{
			title: "Gy",
			lineColor: "#C24642",
			titleFontColor: "#C24642",
			labelFontColor: "#C24642",
                  minimum: -300,
                  maximum: 300
		// D95A3F CF6B3C
		//[-16, 16]
		}],
		axisY2:[
		{
			title: "Gz",
			lineColor: "#86B402",
			titleFontColor: "#86B402",
			labelFontColor: "#86B402",
                  minimum: -300,
                  maximum: 300
		// [-1000, 1000]
		}],
      	data: [{
      		type: "spline",
			lineThickness:1,
			showInLegend: true,    
			color: "#3160BA",      
			name: "First",        
      		dataPoints : dpsx1
      	},
      	{
      		type: "spline",
			lineDashType: "dot",
			lineThickness:2,
			showInLegend: true, 
			color: "#C24642",          
			name: "Second",       
			axisYIndex: 1,  
      		dataPoints : dpsx2
      	},
      	{
      		type: "spline",
			lineDashType: "dash",
			color: "#86B402",
			lineThickness:2,
			showInLegend: true,                
			axisYType: "secondary",         
			name: "Third",       
			axisYIndex: 0,  
      		dataPoints : dpsx3
      	}],
      	legend: {
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart1.render();
            }
          }
      });

      /*var chart2 = new CanvasJS.Chart("chartContainer2",{
            title :{
                  text: "Aceleración"
            },
            axisX: {                                  
                  title: "ID"
            },
            axisY:[
            {
                  title: "Ax",
                  lineColor: "#3160BA",
                  titleFontColor: "#3160BA",
                  labelFontColor: "#3160BA",
                  minimum: -30,
                  maximum: 30
            // 338CC4 369EAD
            //[-2000, 2000]
            },
            {
                  title: "Ay",
                  lineColor: "#C24642",
                  titleFontColor: "#C24642",
                  labelFontColor: "#C24642",
                  minimum: -30,
                  maximum: 30
            // D95A3F CF6B3C
            //[-16, 16]
            }],
            axisY2:[
            {
                  title: "Az",
                  lineColor: "#86B402",
                  titleFontColor: "#86B402",
                  labelFontColor: "#86B402",
                  minimum: -30,
                  maximum: 30
            // [-1000, 1000]
            }],
            data: [{
                  type: "spline",
                  lineThickness:1,
                  showInLegend: true,    
                  color: "#3160BA",      
                  name: "First",        
                  dataPoints : dpsa1
            },
            {
                  type: "spline",
                  lineDashType: "dot",
                  lineThickness:2,
                  showInLegend: true, 
                  color: "#C24642",          
                  name: "Second",       
                  axisYIndex: 1,  
                  dataPoints : dpsa2
            },
            {
                  type: "spline",
                  lineDashType: "dash",
                  color: "#86B402",
                  lineThickness:2,
                  showInLegend: true,                
                  axisYType: "secondary",         
                  name: "Third",       
                  axisYIndex: 0,  
                  dataPoints : dpsa3
            }],
            legend: {
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart2.render();
            }
          }
      });*/

      chart1.render();
      //chart2.render();
      var xVal = dpsx1.length + 1;	


      var updateChart = function () {
      	var setHeader = function (req) {
                req.setRequestHeader('content-type', 'application/json'); 
                req.setRequestHeader('accept', 'application/json');  
            }; 
            $.ajax({
                type: "GET",
                url: "imu",
                beforeSend: setHeader,
                success: function(res){
                  refreshChart(res);
                }
            });
      }

      var refreshChart = function(res){
            var quantity = 20 - res.count - pos;
            if(quantity < 0) quantity = 0;
            pos = res.count;
            for (var i = quantity; i < 20; i++) {
                  if(res.array[i]){
                        dpsx1.push({x: xVal,y: parseFloat(res.array[i].gx)});
                        dpsx2.push({x: xVal,y: parseFloat(res.array[i].gy)});
                        dpsx3.push({x: xVal,y: parseFloat(res.array[i].gz)});

                        dpsa1.push({x: xVal,y: parseFloat(res.array[i].ax)});
                        dpsa2.push({x: xVal,y: parseFloat(res.array[i].ay)});
                        dpsa3.push({x: xVal,y: parseFloat(res.array[i].az)});
                        xVal++;
                        if (dpsx1.length >  20 )
                        {
                              dpsx1.shift();                       
                        }
                        if (dpsx2.length >  20 )
                        {
                              dpsx2.shift();                       
                        }
                        if (dpsx3.length >  20 )
                        {
                              dpsx3.shift();                       
                        }

                        if (dpsa1.length >  20 )
                        {
                              dpsa1.shift();                       
                        }
                        if (dpsa2.length >  20 )
                        {
                              dpsa2.shift();                       
                        }
                        if (dpsa3.length >  20 )
                        {
                              dpsa3.shift();                       
                        }
                  }
            }
      	   chart1.render();		
            //chart2.render();        
            updateChart();

};
updateChart();

//setInterval(function(){updateChart()}, updateInterval); 
}