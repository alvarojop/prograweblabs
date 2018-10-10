var express = require('express');
var router = express.Router();

var facturas = {"facturas":[
    { id: 0, serie: "A", numero: "1", fecha: "01/01/2018", nit: "7654321-1", nombre: "Maria Anders", anulada: "No" },
    { id: 1, serie: "A", numero: "2", fecha: "05/01/2018", nit: "7572413-8", nombre: "Francisco Chang", anulada: "Si" },
    { id: 2, serie: "A", numero: "3", fecha: "02/02/2018", nit: "2035684-9", nombre: "Roland Mendel", anulada: "No" },
    { id: 3, serie: "A", numero: "4", fecha: "27/02/2018", nit: "5256585-4", nombre: "Helen Bennett", anulada: "No" },
    { id: 4, serie: "A", numero: "5", fecha: "08/06/2018", nit: "7582458-6", nombre: "Yoshi Tannamuri", anulada: "No" },
    { id: 5, serie: "A", numero: "6", fecha: "07/08/2018", nit: "2563452-1", nombre: "Giovanni Rovelli", anulada: "No" }
  ]
};

router.get('/', function(req, res, next) {
  res.send(facturas);
});

router.get('/api/v1/factura/', function(req, res, next) {
  res.send(facturas);
});

router.get('/api/v1/factura/:id', function(req, res, next) {
  var id = req.params.id;
  const factura = facturas.facturas.find(f => f.id == id);
  if(!factura) {
    res.status(404).send('factura no encontrada');
  } else {
    res.status(200).send(factura);
  }
});

router.post('/api/v1/factura/', function(req, res, next) {
  const factura = {
    id: facturas.facturas.length + 1,
    serie: req.body.serie,
    numero: req.body.numero,
    fecha: req.body.fecha,
    nit: req.body.nit,
    nombre: req.body.nombre,
    anulada: req.body.anulada
  }
  facturas.facturas.push(factura);
  res.status(201).send(factura);
});

router.delete('/api/v1/factura/:id', function(req, res, next) {
  var id = req.params.id;
  const factura = facturas.facturas.find(f => f.id == id);
  if(!factura) {
    res.status(404).send('factura no encontrada');
  } else {
    const index = facturas.facturas.indexOf(factura);
    facturas.facturas.splice(index,1);
    res.status(204).send(factura);
  }
});

router.put('/api/v1/factura/:id', function(req, res, next) {
  var id = req.params.id;
  const factura = facturas.facturas.find(f => f.id == id);
  if(!factura) {
    res.status(404).send('factura no encontrada');
  } else {
    factura.serie = req.body.serie,
    factura.numero = req.body.numero,
    factura.fecha = req.body.fecha,
    factura.nit = req.body.nit,
    factura.nombre = req.body.nombre,
    factura.anulada = req.body.anulada
    res.status(204).send(req.factura);
  }
});

module.exports = router;
