function changePassword(email, newPassword, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

  const bcrypt = require('bcrypt');
  const { Client } = require('pg');
  const client = new Client({
    host: configuration.host,
    port: parseInt(configuration.port),
    user: configuration.user,
    password: configuration.password,
    database: configuration.database
  });

  client.connect(function (err) {
    if (err) return callback(err);

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) return callback(err);

      const query = 'UPDATE public.user SET password = $1 WHERE email = $2';
      client.query(query, [hash, email], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        client.end();

        return callback(err, result && result.rowCount > 0);
      });
    });
  });
}
