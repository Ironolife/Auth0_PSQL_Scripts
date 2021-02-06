function loginByEmail(email, callback) {
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

    const query = 'SELECT email FROM public.user WHERE email = $1';
    client.query(query, [email], function (err, result) {
      // NOTE: always call `done()` here to close
      // the connection to the database
      client.end();

      if (err || result.rows.length === 0) return callback(err);

      const user = result.rows[0];

      return callback(null, {
        user_id: user.id,
        email: user.email
      });
    });
  });
}
