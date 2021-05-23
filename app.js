//. app.js
var express = require( 'express' ),
    request = require( 'request' ),
    app = express();
  
var settings = require( './settings' );

app.use( express.Router() );


var access_token = null;
var option = {
  url: 'https://' + settings.hostname + '/dbapi/v4/auth/tokens',
  json: { userid: settings.username, password: settings.password },
  headers: { 'content-type': 'application/json', 'x-deployment-id': settings.deployment_id },
  method: 'POST'
};
request( option, async function( err, res0, body ){
  if( err ){
    console.log( { err } );
  }else{
    if( body && body.token ){
      access_token = body.token;
      console.log( { access_token } );
    }
  }
});


app.get( '/ping', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  if( access_token ){
    var sql0 = 'select TABNAME, TABSCHEMA, OWNER from syscat.tables fetch first 5 rows only;';
    var option0 = {
      url: 'https://' + settings.hostname + '/dbapi/v4/sql_jobs',
      json: { commands: sql0, limit: 10, separator: ';', stop_on_error: 'no' },
      headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + access_token, 'x-deployment-id': settings.deployment_id },
      method: 'POST'
    };
    request( option0, async function( err0, res0, body0 ){
      if( err0 ){
        console.log( { err0 } );
        res.status( 400 );
        res.write( JSON.stringify( { error: err0 }, null, 2 ) );
        res.end();
      }else{
        if( body0 && body0.id ){
          console.log( { body0 } );
          var option1 = {
            url: 'https://' + settings.hostname + '/dbapi/v4/sql_jobs/' + body0.id,
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + access_token, 'x-deployment-id': settings.deployment_id },
            method: 'GET'
          };
          request( option1, async function( err1, res1, body1 ){
            if( err1 ){
              console.log( { err1 } );
              res.status( 400 );
              res.write( JSON.stringify( { error: err1 }, null, 2 ) );
              res.end();
            }else{
              //. body1 は string
              body1 = JSON.parse( body1 );
              console.log( { body1 } );
              res.write( JSON.stringify( body1, null, 2 ) );
              res.end();
            }
          });
        }else{
          res.status( 400 );
          res.write( JSON.stringify( { error: body0 }, null, 2 ) );
          res.end();
        }
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { error: 'no access_token' }, null, 2 ) );
    res.end();
  }
});

app.get( '/sysinfo', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  if( access_token ){
    var sql0 = "select TABNAME, TABSCHEMA, OWNER from syscat.tables where TABNAME = 'SYSTABLES';";
    var option0 = {
      url: 'https://' + settings.hostname + '/dbapi/v4/sql_jobs',
      json: { commands: sql0, limit: 10, separator: ';', stop_on_error: 'no' },
      headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + access_token, 'x-deployment-id': settings.deployment_id },
      method: 'POST'
    };
    request( option0, async function( err0, res0, body0 ){
      if( err0 ){
        console.log( { err0 } );
        res.status( 400 );
        res.write( JSON.stringify( { error: err0 }, null, 2 ) );
        res.end();
      }else{
        if( body0 && body0.id ){
          console.log( { body0 } );
          var option1 = {
            url: 'https://' + settings.hostname + '/dbapi/v4/sql_jobs/' + body0.id,
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + access_token, 'x-deployment-id': settings.deployment_id },
            method: 'GET'
          };
          request( option1, async function( err1, res1, body1 ){
            if( err1 ){
              console.log( { err1 } );
              res.status( 400 );
              res.write( JSON.stringify( { error: err1 }, null, 2 ) );
              res.end();
            }else{
              //. body1 は string
              body1 = JSON.parse( body1 );
              console.log( { body1 } );
              res.write( JSON.stringify( body1, null, 2 ) );
              res.end();
            }
          });
        }else{
          res.status( 400 );
          res.write( JSON.stringify( { error: body0 }, null, 2 ) );
          res.end();
        }
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { error: 'no access_token' }, null, 2 ) );
    res.end();
  }
});

//. https://qiita.com/mi-kana/items/6c27353424fd029dccb2
app.get( '/check', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  if( access_token ){
    var sql0 = "select TABNAME, TABSCHEMA, OWNER from syscat.tables where TABNAME = ?;";
    var option0 = {
      url: 'https://' + settings.hostname + '/dbapi/v4/sql_jobs',
      json: { commands: sql0, params: [ 'SYSTABLES' ], limit: 10, separator: ';', stop_on_error: 'no' },
      headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + access_token, 'x-deployment-id': settings.deployment_id },
      method: 'POST'
    };
    request( option0, async function( err0, res0, body0 ){
      if( err0 ){
        console.log( { err0 } );
        res.status( 400 );
        res.write( JSON.stringify( { error: err0 }, null, 2 ) );
        res.end();
      }else{
        //. "The number of variables in the EXECUTE statement, the number of variables in the OPEN statement, or the number of arguments in an OPEN statement for a parameterized cursor is not equal to the number of values required.. SQLCODE=-313, SQLSTATE=07004, DRIVER=4.26.14"
        if( body0 && body0.id ){
          console.log( { body0 } );
          var option1 = {
            url: 'https://' + settings.hostname + '/dbapi/v4/sql_jobs/' + body0.id,
            headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + access_token, 'x-deployment-id': settings.deployment_id },
            method: 'GET'
          };
          request( option1, async function( err1, res1, body1 ){
            if( err1 ){
              console.log( { err1 } );
              res.status( 400 );
              res.write( JSON.stringify( { error: err1 }, null, 2 ) );
              res.end();
            }else{
              //. body1 は string
              body1 = JSON.parse( body1 );
              console.log( { body1 } );
              res.write( JSON.stringify( body1, null, 2 ) );
              res.end();
            }
          });
        }else{
          res.status( 400 );
          res.write( JSON.stringify( { error: body0 }, null, 2 ) );
          res.end();
        }
      }
    });
  }else{
    res.status( 400 );
    res.write( JSON.stringify( { error: 'no access_token' }, null, 2 ) );
    res.end();
  }
});


var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
