/**
* @descripción Funciones relacionadas con la presión
* @autor Adrián Sánchez <contact@imaginexyz.com>
*/

var pressNow = {difficulty:0,extra:20,status:false},
    pressSensors = {1:{press:880,status:false,goal:940},2:{press:880,status:false,goal:940},3:{press:880,status:false,goal:940},4:{press:880,status:false,goal:940},5:{press:880,status:false,goal:940}, difficulty:0, extra:20},
    difficulties = {0:{extra:20},1:{extra:20},2:{extra:15},3:{extra:15},4:{extra:15},5:{extra:10},6:{extra:10},7:{extra:10},8:{extra:10},9:{extra:5},10:{extra:5},11:{extra:5},12:{extra:5},13:{extra:5},14:{extra:5}};

//POST- CREATE
exports.getBasic = function(req, res) {
    var sendPress = pressNow;
    if(pressNow.status){
        if(pressNow.difficulty == 15){
            pressNow = {difficulty:0,extra:20,status:false};
            pressSensors = {1:{press:880,status:false,goal:940},2:{press:880,status:false,goal:940},3:{press:880,status:false,goal:940},4:{press:880,status:false,goal:940},4:{press:880,status:false,goal:940}, difficulty:0, extra:20};
        }
        else{
            pressSensors = {1:{press:880,status:false,goal:Math.floor((Math.random() * 100) + 860)},2:{press:880,status:false,goal:Math.floor((Math.random() * 100) + 860)},3:{press:880,status:false,goal:Math.floor((Math.random() * 100) + 860)},4:{press:880,status:false,goal:Math.floor((Math.random() * 100) + 860)},5:{press:880,status:false,goal:Math.floor((Math.random() * 100) + 860)}, difficulty:0, extra:20};
            pressNow.difficulty++;
            pressNow.extra = difficulties[pressNow.difficulty].extra;
            pressNow.status = false;
            pressSensors.difficulty = pressNow.difficulty;
            pressSensors.extra = pressNow.extra;
        } 
    }
    res.send(200, JSON.stringify(sendPress));
}

exports.getPress = function(req, res) {
    res.send(200, pressSensors);
}

exports.postPress = function(req, res) {
    var idSensor = parseInt(req.body.Sensor.split('_')[1]);
    pressSensors[idSensor].press = parseFloat(req.body.Valor);
    pressSensors[idSensor].status = (pressSensors[idSensor].goal-pressSensors.extra)<=parseFloat(req.body.Valor) && parseFloat(req.body.Valor)<=(pressSensors[idSensor].goal+pressSensors.extra);
    if(pressSensors[1].status && pressSensors[2].status && pressSensors[3].status && pressSensors[4].status && pressSensors[5].status){
        pressNow.status=true;
        res.send(201, JSON.stringify(req.body));    
    }
    else{
        res.send(200, JSON.stringify(req.body));    
    }
}