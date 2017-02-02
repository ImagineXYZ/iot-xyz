/**
* @descripción Funciones relacionadas con la ultrasónico
* @autor Adrián Sánchez <contact@imaginexyz.com>
*/

var ultraNow = {difficulty:0,time:10,extra:8,status:false,left:0},
    ultraSensors = {1:{ultra:0,status:false,goal:15},2:{ultra:0,status:false,goal:15},3:{ultra:0,status:false,goal:15},4:{ultra:0,status:false,goal:15},5:{ultra:0,status:false,goal:15}, difficulty:0, time:10, date:0, extra:8},
    difficulties = {0:{time:10,extra:8},1:{time:15,extra:8},2:{time:10,extra:6},3:{time:15,extra:6},4:{time:20,extra:6},5:{time:10,extra:4},6:{time:15,extra:4},7:{time:20,extra:4},8:{time:25,extra:4},9:{time:10,extra:2},10:{time:15,extra:2},11:{time:20,extra:2},12:{time:25,extra:2},13:{time:30,extra:2},14:{time:30,extra:1}};

//POST- CREATE
exports.getBasic = function(req, res) {
    var sendUltra = ultraNow;
    if(ultraNow.status){
        if(ultraNow.difficulty == 14){
            ultraNow = {difficulty:0,time:10,extra:20,status:false,left:0};
            ultraSensors = {1:{ultra:0,status:false,goal:15},2:{ultra:0,status:false,goal:15},3:{ultra:0,status:false,goal:15},4:{ultra:0,status:false,goal:15},5:{ultra:0,status:false,goal:15},difficulty:0, time:10, date:0, extra:8};
        }
        else{
            ultraSensors = {1:{ultra:0,status:false,goal:Math.floor((Math.random() * 15) + 2)},2:{ultra:0,status:false,goal:Math.floor((Math.random() * 15) + 2)},3:{ultra:0,status:false,goal:Math.floor((Math.random() * 15) + 2)},4:{ultra:0,status:false,goal:Math.floor((Math.random() * 15) + 2)},5:{ultra:0,status:false,goal:Math.floor((Math.random() * 15) + 2)}, difficulty:0, time:10, date:0, extra:8},
            ultraNow.difficulty++;
            ultraNow.time = difficulties[ultraNow.difficulty].time;
            ultraNow.extra = difficulties[ultraNow.difficulty].extra;
            ultraNow.left = 0;
            ultraNow.extra = difficulties[ultraNow.difficulty].extra;
            ultraNow.status = false;
            ultraSensors.difficulty = ultraNow.difficulty;
            ultraSensors.time = ultraNow.time;
            ultraSensors.date = 0;
            ultraSensors.extra = ultraNow.extra;
        } 
    }
    res.send(200, JSON.stringify(sendUltra));
}

exports.getUltra = function(req, res) {
    res.send(200, ultraSensors);
}

exports.getRange = function(req, res) {
    var id = parseInt(req.query.id),
        range = {min:ultraSensors[id].goal-ultraSensors.extra, max:ultraSensors[id].goal+ultraSensors.extra};
    res.send(200, JSON.stringify(range));
}

exports.postUltra = function(req, res) {
    console.log(req.body);
    if(parseInt(req.body.Valor) == 51){
        req.body.Valor = 0;
    }
    var idSensor = parseInt(req.body.Sensor.split('_')[1]);
    ultraSensors[idSensor].ultra = parseInt(req.body.Valor);
    ultraSensors[idSensor].status = (ultraSensors[idSensor].goal-ultraSensors.extra)<=parseInt(req.body.Valor) && parseInt(req.body.Valor)<=(ultraSensors[idSensor].goal+ultraSensors.extra);
    if(ultraSensors[1].status && ultraSensors[2].status && ultraSensors[3].status && ultraSensors[4].status && ultraSensors[5].status){
        if(ultraSensors.date != 0){
            var left = Math.round((new Date()-ultraSensors.date)/1000);
            if(left>=ultraSensors.time){
                ultraNow.status=true;   
            }
            else ultraNow.left = left;
        }
        else{
            ultraSensors.date = new Date();
        }
        res.send(201, JSON.stringify(req.body));    
    }
    else{
        ultraNow.left = 0;
        ultraSensors.date = 0;
        res.send(200, JSON.stringify(req.body));    
    }
}