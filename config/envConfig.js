require('dotenv').config();

const env = {
  baseUrl: process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC',
};

module.exports = env;
