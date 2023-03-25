import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  protected matchModel : ModelStatic<MatchModel> = MatchModel;
  protected teamModel : ModelStatic<TeamModel> = TeamModel;

  async getAll(): Promise<MatchModel[]> {
    const result = await this.matchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return result;
  }
}
