import { get, post, put, del, responseJSON } from '@utils/apiUtil'
import { AIR_SERVER } from '@utils/urlUtil'
import querystring from 'querystring';

var express = require('express');
var router = express.Router();

/* Restful For Micro Service */
// Get history 8 hours aqi data
router.post('/history', (req, res, next) => {
    let params = {};

    Object.keys(req.query).forEach(key => {
      if(key === 'actionType') return;
      params[key] = req.query[key];
    });

    get(AIR_SERVER + '/report/history?' + querystring.stringify(params), req.headers.jwt_info_json).then(response => {
        responseJSON(response, res);
    });
});

// Get history instrument data.
router.post('/factor/concentration', (req, res, next) =>  {
    let params = {};

    Object.keys(req.query).forEach(key => {
      if(key === 'actionType') return;
      params[key] = req.query[key];
    });

    get(AIR_SERVER + '/report/factor/concentration?' + querystring.stringify(params), req.headers.jwt_info_json).then(response => {
        responseJSON(response, res);
    });
});

module.exports = router;
