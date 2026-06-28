import dotenv from 'dotenv';

dotenv.config();

const env = {
  baseUrl: process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC',
  timeouts: {
    defaultTimeout: Number(process.env.DEFAULT_TIMEOUT) || 60000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,
    actionTimeout: Number(process.env.ACTION_TIMEOUT) || 15000,
  },
};

export default env;
