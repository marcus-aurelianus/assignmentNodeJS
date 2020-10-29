import Express from 'express';
import { NO_CONTENT,INTERNAL_SERVER_ERROR } from 'http-status-codes';

import Logger from '../config/logger';
import RegisterUserService from '../services/RegisterUserService';

const RegisterController = Express.Router();
const LOG = new Logger('RegisterController.js');


const registerHandler = async (req, res) => {

  LOG.info(`Starting the RegisterUserService with input ${JSON.stringify(req.body)}`);

  const result = await RegisterUserService(req.body);

  if (result === 'success')
  {

    LOG.info('User record successfully registered');
    return res.status(NO_CONTENT).send('Updated')

  } else {

    LOG.info(`User record failed registered, the reason is ${result}`);
    return res.status(INTERNAL_SERVER_ERROR).send(result)

  }
}

RegisterController.post('/register', registerHandler);

export default RegisterController;
