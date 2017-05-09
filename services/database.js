/**
* @descripción Funciones relacionadas con la base de datos
* @autor Adrián Sánchez <contact@imaginexyz.com>
*/

var mongo = require('mongodb'); //Biblioteca para comunicarse con la base de datos MongoDB

//Puerto de conexión con la base de datos (no es el mismo de escucha del servidor)
var uristring = 
  process.env.MONGODB_URI || 
  process.env.MONGOHQ_URL || 
  process.env.MONGOLAB_URI||
  'mongodb://localhost/IoT';


//Conexión con la base de datos
mongo.MongoClient.connect(uristring, function(err, database) {
    if(!err) {
        db = database; //Instancia de la base de datos
        console.log('Connected to the "IoT" database');
    }
    else{
        console.log(404, 'Error Connecting to the "IoT" database');
    }
});

//Función para el manejo de la zona horaria
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

/* Funciones CRUD Básicas */

//GET - READ
exports.getData = function(req,res) {
    var query = req.query;
    db.collection('IoT').find(query).toArray(function(error, doc){
        if(error) {
            throw error;
            res.send(400, error);
        }
        else{
            res.send(200, doc);
        }
    })
}

exports.getLast = function(req,res) {
  var options = {
    "limit": 1,
    "sort": [["_id",'desc']]
  },
  query = req.query;

  db.collection('IoT').find(query, options).toArray(function(err, doc){
      if(err) res.send(400, err);
      res.send(200, doc[0]);
  })
}

exports.getMobile = function(req,res) {
    var query = req.query;
    db.collection('Mobile').find(query).toArray(function(error, doc){
        if(error) {
            throw error;
            res.send(400, error);
        }
        else{
            res.send(200, doc);
        }
    })
}


//POST- CREATE
exports.addIoT = function(req, res) {
    var resource = req.body;
    resource['date'] = new Date().addHours(-6);
    resource['hour'] = new Date().addHours(-6).getHours();
    resource['minute'] = new Date().addHours(-6).getMinutes();
    db.collection('Ids').findAndModify({_id:1},{},{$inc:{iot:1}},function(err, doc_ids) {
        if(err) {
            throw err;
            res.send(400, err);
        }
        else{
            resource["_id"] = doc_ids.value.iot;
            db.collection('IoT').insert(resource, function(error, doc_project){
                if(error) {
                    throw error;
                    res.send(400, error);
                }
                else{
                    res.send(200, resource);
                }
            })
        }
    });
}

exports.addMobile = function(req, res) {
    //console.log(req.body.data);
    var x = req.body.data,
    y = x.replace(/}{/gi,"};{").split(";");
    y.forEach(function(element, index){
        try{
            var z = JSON.parse(element);
            db.collection('Ids').findAndModify({_id:1},{},{$inc:{mobile:1}},function(err, doc_ids) {
                if(err) {
                    throw err;
                    res.send(400, err);
                }
                else{
                    z["_id"] = doc_ids.value.mobile;
                    db.collection('Mobile').insert(z, function(error, doc_project){
                        if(error) {
                            throw error;
                            res.send(400, error);
                        }
                        else{
                            //res.send(200, resource);
                        }
                    })
                }
            }); 
        }
        catch(e){
            console.log(e);
        }
    });
    res.send(200, true);
}