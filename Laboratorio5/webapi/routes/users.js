var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Facturas';
var db;

mongo.connect(url, function(err, client) {
  if(!err) {
    console.log("Conexion exitosa.");
    db = client.db('Facturas');
  }
});

router.get('/api/v1/factura/', function(req, res, next) {
  db.collection('facturas').find().toArray((err, result) => {
    if (err) {
      return console.log(err)
    } else {
      res.send({facturas: result})
    }
  })
});

router.post('/api/v1/factura/', function(req, res, next) {
  const factura = {
    serie: req.body.serie,
    numero: req.body.numero,
    fecha: req.body.fecha,
    nit: req.body.nit,
    nombre: req.body.nombre,
    anulada: req.body.anulada
  }
  db.collection('facturas').insertOne(factura, function(err, result){
    assert.equal(null, err);
    if (err) {
      return console.log(err)
    } else {
      console.log("Factura creada exitosamente.");
      res.status(201).send(result);
    }
  });
});

router.delete('/api/v1/factura/:id', function(req, res, next) {
  var id = req.params.id;
  db.collection('facturas').deleteOne({"_id": objectId(id)}, function(err, result) {
    assert.equal(null, err);
    if (err) {
      return console.log(err)
    } else {
      console.log('Factura eliminada exitosamente.');
      res.status(204).send(result);
    }
  });
});

router.put('/api/v1/factura/:id', function(req, res, next) {
  var id = req.params.id;
  const factura = {
    serie: req.body.serie,
    numero: req.body.numero,
    fecha: req.body.fecha,
    nit: req.body.nit,
    nombre: req.body.nombre,
    anulada: req.body.anulada
  }
  db.collection('facturas').updateOne({"_id": objectId(id)}, {$set: factura}, function(err, result) {
    assert.equal(null, err);
    if (err) {
      return console.log(err)
    } else {
      console.log('Factura modificada exitosamente.');
      res.status(204).send(result);
    }
  });
});

module.exports = router;
