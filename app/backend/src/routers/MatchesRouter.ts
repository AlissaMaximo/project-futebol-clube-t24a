import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
const matchController = new MatchesController();

matchesRouter.get(
  '/matches',
  (req, res) => matchController.getAll(req, res),
);
// matchesRouter.get(
//   '/teams/:id',
//   (req, res) => teamController.getById(req, res),
// );

export default matchesRouter;
