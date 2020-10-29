import Express from 'express';
import { OK,INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Logger from '../config/logger';
import WorkloadService from '../services/WorkloadService';

const LOG = new Logger('WorkloadController.js');
const WorkloadController = Express.Router();


const reportWorkloadHandler = async (req, res) => {

  LOG.info('Starting the worldload service');
  const result = await WorkloadService();

  if (result)
  {

    LOG.info(`The worldload service sucess, return value is ${JSON.stringify(result)}`);
    return res.status(OK).json(result)

  } else {

    LOG.info('No record found in database');
    return res.status(INTERNAL_SERVER_ERROR).send('no record')

  }
}

WorkloadController.get('/reports/workload', reportWorkloadHandler);

export default WorkloadController;
