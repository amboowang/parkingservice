'use strict';
const { Client } = require('pg');

module.exports.handler_meters = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event); // Contains incoming request data (e.g., query params, headers and more)

  const client = new Client();
  client.connect().then(() => {
    return client.query('SELECT * FROM park_meter WHERE timestamp >= $1 AND timestamp <= $2', 
                [event.queryStringParameters.from, event.queryStringParameters.to]).then(res => {
                  console.log(`result: ${JSON.stringify(res.rows)}`);
                  callback(null, {statusCode: 200, body: JSON.stringify(res.rows)});
                });
  }).catch(err => {
    console.log(`error: ${err.message}`);
    callback(err);
  });
};

module.exports.handler_meterItem = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event); // Contains incoming request data (e.g., query params, headers and more)

  const client = new Client();
  client.connect().then(() => {
    return client.query('SELECT * FROM park_meter WHERE id = $1', 
                [event.pathParameters.id]).then(res => {
                  console.log(`result: ${JSON.stringify(res.rows[0])}`);
                  callback(null, {statusCode: 200, body: JSON.stringify(res.rows[0])});
                });
  }).catch(err => {
    console.log(`error: ${err.message}`);
    callback(err);
  });
};