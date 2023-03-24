import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRouter = Router();
const teamController = new TeamsController();

teamsRouter.get(
  '/teams',
  (req, res) => teamController.getAll(req, res),
);
teamsRouter.get(
  '/teams/:id',
  teamController.getById,
);

export default teamsRouter;
