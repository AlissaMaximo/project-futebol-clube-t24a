import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get(
  '/leaderboard/home',
  (req, res) => leaderboardController.getHomePerformance(req, res),
);

export default leaderboardRouter;
