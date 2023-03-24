import { Router } from 'express';
import LoginsController from '../controllers/LoginsController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const loginsRouter = Router();
const loginController = new LoginsController();

loginsRouter.post(
  '/login',
  validateLogin,
  (req, res) => loginController.login(req, res),
);

loginsRouter.get(
  '/login/role',
  validateToken,
  (req, res) => loginController.returnRole(req, res),
);

export default loginsRouter;
