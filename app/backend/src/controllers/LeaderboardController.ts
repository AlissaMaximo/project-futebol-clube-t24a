import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private _leaderboardService = new LeaderboardService()) {}

  public async getHomePerformance(_req: Request, res: Response) {
    const result = await this._leaderboardService.rankHome();

    res.status(200).json(result);
  }
}
