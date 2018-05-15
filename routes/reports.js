var express = require('express');
var router = express.Router();

const CONFIG = require(__dirname + '/../.config/service.js')

var knex = require('knex')({
  client: 'pg',
  connection: CONFIG.PG_CONN
});

/* GET All reports. */
router.get('/', function(req, res, next) {
  knex('reports').select({
    title: 'reports.title',
    body: 'reports.body',
    username: 'users.first_name'
  }).join('users', 'reports.user_id', '=', 'users.id').then((response) => {
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
