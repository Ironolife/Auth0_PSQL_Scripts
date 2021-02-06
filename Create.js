function create(user, callback) {
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

    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
      if (err) return callback(err);

      const query = 'INSERT INTO public.user (email, password) VALUES ($1, $2)';
      client.query(query, [user.email, hashedPassword], function (err, result) {
        // NOTE: always call `done()` here to close
        // the connection to the database
        client.end();

        return callback(err);
      });
    });
  });
}
