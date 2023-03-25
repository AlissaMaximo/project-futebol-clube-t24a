import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private _matchService = new MatchesService()) {}

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const result = await this._matchService.getAll(inProgress as string);

    res.status(200).json(result);
  }

  public async endMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const hasEnded = await this._matchService.endMatch(+id);

    if (!hasEnded) return res.status(500).json({ message: 'Internal Server Error' });

    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updatedMatch = await this._matchService.updateMatch(+id, req.body);

    return res.status(200).json(updatedMatch);
  }
}
