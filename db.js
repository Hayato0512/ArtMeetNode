const mysql = require("mysql");
// const connection = require("../app/connection");

//MySQL Connection Detail
var connection = mysql.createPool({
     host: "us-cdbr-east-06.cleardb.net",
       user: "b463dda7a021ae",
       password: "af90497c",
       database: "heroku_85a07a97c5525a4",
     });

// function handleDisconnect() {
//   connection = mysql.createPool({
//     host: "us-cdbr-east-06.cleardb.net",
//     user: "b463dda7a021ae",
//     password: "af90497c",
//     database: "heroku_85a07a97c5525a4",
//   }); // Recreate the connection, since
//                                                   // the old one cannot be reused.

//   connection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
// }
// handleDisconnect()

module.exports = connection;
