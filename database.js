import  knex  from 'knex';
const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      database: 'inventario',
      password: 'postgres'
    }
  });
  export default db;