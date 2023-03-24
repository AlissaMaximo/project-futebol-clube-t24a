import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  private _teamService: TeamsService = new TeamsService();

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const result = await this._teamService.getAll();

    return res.status(200).json(result);
  }

  public async getById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const result = await this._teamService.getById(+id);

    return res.status(200).json(result);
  }
}
