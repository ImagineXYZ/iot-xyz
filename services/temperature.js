/**
* @descripción Funciones relacionadas con la temperatura
* @autor Adrián Sánchez <contact@imaginexyz.com>
*/

var tempNow = {difficulty:0,time:10,extra:20,status:false,left:0},
    tempSensors = {1:{temp:0,status:false,goal:50},2:{temp:0,status:false,goal:50},3:{temp:0,status:false,goal:50}, difficulty:0, time:10, date:0, extra:20},
    difficulties = {0:{time:10,extra:20},1:{time:15,extra:20},2:{time:10,extra:15},3:{time:15,extra:15},4:{time:20,extra:15},5:{time:10,extra:10},6:{time:15,extra:10},7:{time:20,extra:10},8:{time:25,extra:10},9:{time:10,extra:5},10:{time:15,extra:5},11:{time:20,extra:5},12:{time:25,extra:5},13:{time:30,extra:5},14:{time:30,extra:3}};

//POST- CREATE
exports.getBasic = function(req, res) {
    var sendTemp = tempNow;
    if(tempNow.status){
        if(tempNow.difficulty == 14){
            tempNow = {difficulty:0,time:10,extra:20,status:false,left:0};
            tempSensors = {1:{temp:0,status:false,goal:50},2:{temp:0,status:false,goal:50},3:{temp:0,status:false,goal:50},difficulty:0, time:10, date:0, extra:20};
        }
        else{
            tempSensors = {1:{temp:0,status:false,goal:Math.floor((Math.random() * 75) + 20)},2:{temp:0,status:false,goal:Math.floor((Math.random() * 75) + 20)},3:{temp:0,status:false,goal:Math.floor((Math.random() * 75) + 20)}, difficulty:0, time:10, date:0, extra:20},
            tempNow.difficulty++;
            tempNow.time = difficulties[tempNow.difficulty].time;
            tempNow.extra = difficulties[tempNow.difficulty].extra;
            tempNow.left = 0;
            tempNow.extra = difficulties[tempNow.difficulty].extra;
            tempNow.status = false;
            tempSensors.difficulty = tempNow.difficulty;
            tempSensors.time = tempNow.time;
            tempSensors.date = 0;
            tempSensors.extra = tempNow.extra;
        } 
    }
    res.send(200, JSON.stringify(sendTemp));
}

exports.getTemp = function(req, res) {
    res.send(200, tempSensors);
}

exports.postTemp = function(req, res) {
    console.log(req.body);
    var idSensor = parseInt(req.body.Sensor.split('_')[1]);
    tempSensors[idSensor].temp = parseFloat(req.body.Valor);
    tempSensors[idSensor].status = (tempSensors[idSensor].goal-tempSensors.extra)<=parseFloat(req.body.Valor) && parseFloat(req.body.Valor)<=(tempSensors[idSensor].goal+tempSensors.extra);
    if(tempSensors[1].status && tempSensors[2].status){
        if(tempSensors.date != 0){
            var left = Math.round((new Date()-tempSensors.date)/1000);
            if(left>=tempSensors.time){
                tempNow.status=true;   
            }
            else tempNow.left = left;
        }
        else{
            tempSensors.date = new Date();
        }
        res.send(201, JSON.stringify(req.body));    
    }
    else{
        tempNow.left = 0;
        tempSensors.date = 0;
        res.send(200, JSON.stringify(req.body));    
    }
}