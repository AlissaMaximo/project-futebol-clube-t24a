import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) {}

  async getPerformance(req: Request, res: Response) {
  // req.path e req.url dá o mesmo resultado: /leaderboard/away (ou home no lugar de away)
    const isHome = req.url.split('/')[2] === 'home';

    const result = await this._leaderboardService.rank(isHome);

    res.status(200).json(result);
  }
}
