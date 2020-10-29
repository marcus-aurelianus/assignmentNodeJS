import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import RegisterController from './controllers/RegisterController';
import WorkloadController from './controllers/WorkloadController';

const router = Express.Router();

router.use('/', [HealthcheckController,RegisterController,WorkloadController]);

export default router;
