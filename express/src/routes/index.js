import express from 'express'
import { get } from '../utils/apiUtil'

let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query)
  res.render('index', { title: 'Express' });
});

module.exports = router;
