function verify(email, callback) {
  //this example uses the "pg" library
  //more info here: https://github.com/brianc/node-postgres

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

    const query =
      'UPDATE public.user SET email_verified = true WHERE email_verified = false AND email = $1';
    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      client.end();

      return callback(err, result && result.rowCount > 0);
    });
  });
}
