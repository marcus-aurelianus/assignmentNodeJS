import { Sequelize} from 'sequelize';
import Logger from './logger';
//const {Sequelize} = require('sequelize');


const LOG = new Logger('database.js');
const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_SCHEMA = 'school-administration-system',
  DB_USER = 'root',
  DB_PW = 'password',
  DB_POOL_ACQUIRE = '30000',
  DB_POOL_IDLE = '10000',
  DB_POOL_MAX_CONN = '10',
  DB_POOL_MIN_CONN = '1',
  DB_LOG_LEVEL = 'info',
} = process.env

const sequelize = new Sequelize(DB_SCHEMA, DB_USER, DB_PW, {
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  pool: {
    acquire: parseInt(DB_POOL_ACQUIRE),
    idle: parseInt(DB_POOL_IDLE),
    max: parseInt(DB_POOL_MAX_CONN),
    min: parseInt(DB_POOL_MIN_CONN)
  },
  timezone: '+08:00',
  logging: (msg) => {
    LOG[DB_LOG_LEVEL](msg);
  }
});

// initilize teacher table in sequelize
export const Teacher = sequelize.define('teacher', {
  name: Sequelize.STRING(100),
  email:Sequelize.STRING(100),
  students: Sequelize.JSON,
  subjectCode:Sequelize.STRING(100),
  subjectName:Sequelize.STRING(100),
  classCode:Sequelize.STRING(100),
  className:Sequelize.STRING(100)
});

// if the table is not existed, create it with sequelize.sync
(async () => {
  await sequelize.sync({ force: false });
})();


export default sequelize;

