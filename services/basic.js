/**
* @descripción Funciones relacionadas con la presión
* @autor Adrián Sánchez <contact@imaginexyz.com>
*/

var pressSensors = {1:{press:880,goal:940},2:{press:880,goal:940}},
    tempSensors = {1:{temp:0,goal:50},2:{temp:0,goal:50}},
    ultraSensors = {1:{ultra:0,goal:15},2:{ultra:0,goal:15}},
    imuSensors = [],
    press=0;

exports.getPress = function(req, res) {
    res.send(200, pressSensors);
}

exports.postPress = function(req, res) {
    console.log(req.body);
    press++;
    console.log(press);
    var idSensor = parseInt(req.body.Sensor.split('_')[1]);
    pressSensors[idSensor].press = parseFloat(req.body.Valor);
    res.send(200, JSON.stringify(req.body)); 
}

exports.getTemp = function(req, res) {
    res.send(200, tempSensors);
}

exports.postTemp = function(req, res) {
    console.log(req.body);
    var idSensor = parseInt(req.body.Sensor.split('_')[1]);
    tempSensors[idSensor].temp = parseFloat(req.body.Valor);
    res.send(200, JSON.stringify(req.body)); 
}


exports.getUltra = function(req, res) {
    res.send(200, ultraSensors);
}

exports.postUltra = function(req, res) {
    console.log(req.body);
    if(parseInt(req.body.Valor) == 51){
        req.body.Valor = 0;
    }
    var idSensor = parseInt(req.body.Sensor.split('_')[1]);
    ultraSensors[idSensor].ultra = parseInt(req.body.Valor);
    res.send(200, JSON.stringify(req.body)); 
}


exports.mqttUltra = function(id, value) {
    ultraSensors[id].ultra = parseFloat(value);
}

exports.mqttTemp = function(id, value) {
    tempSensors[id].temp = parseFloat(value);
}

exports.mqttPress = function(id, value) {
    pressSensors[id].press = parseFloat(value);
}

exports.mqttBmp = function(id, temp, press) {
    tempSensors[id].temp = parseFloat(temp);
    pressSensors[id].press = parseFloat(press);
}

exports.mqttImu = function(msgJson) {
    console.log(msgJson);
    imuSensors.push(msgJson);
}

exports.getImu = function(req, res) {
    var startIndex = 0;
    if(imuSensors.length > 20){
        startIndex = imuSensors.length - 20;
    }
    var newArray = imuSensors.slice(startIndex, imuSensors.length);
    res.send(200, {count:imuSensors.length, array:newArray});
}
