require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

module.exports = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dialect: process.env.DATABASE_DIALECT,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
};
