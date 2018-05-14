var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'chivalist-test-db.cfx2zmgjrtr7.us-east-1.rds.amazonaws.com',
    user: 'david',
    password: 'pU7SYg4oo2jsRzE8h1hBe54S0Yl6OGlhYWL6vbVTBREeEWUWZi887Q6COUjzV3JhSrK5skKEu16ViGSxBkCYJW1x7eGzEomZdfqf',
    database: 'chivaldb',
    port: 5588
  }
});

/* GET All reports. */
router.get('/', function(req, res, next) {
  knex('reports').select({
    title: 'title',
    body: 'body'
  }).then((response) => {
    res.send(response)
  }).catch((err) => {
    res.status(500).send(err)
  })
});

router.post('/', function(req, res, next) {
  knex('reports').insert({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id
  }, ['id']).then((response) => {
    res.send(response)
  }).catch((error) => {
    res.status(500).send(error)
  })
})

router.put('/', function(req, res, next) {
  knex('reports').where({
    id: req.body.report_id
  }).update({
    title: req.body.title ? req.body.title : undefined,
    body: req.body.body ? req.body.body : undefined
  }).then((response) => {
    res.sendStatus(200)
  }).catch((error) => {
    console.error(error)
    res.status(500).send(error)
  })
})

module.exports = router;
