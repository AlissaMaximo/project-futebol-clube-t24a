import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
const matchController = new MatchesController();

matchesRouter.get(
  '/matches',
  (req, res) => matchController.getAll(req, res),
);
matchesRouter.patch(
  '/matches/:id/finish',
  validateToken,
  (req, res) => matchController.endMatch(req, res),
);

export default matchesRouter;
