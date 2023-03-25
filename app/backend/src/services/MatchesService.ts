import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  protected matchModel : ModelStatic<MatchModel> = MatchModel;
  protected teamModel : ModelStatic<TeamModel> = TeamModel;

  public async getAll(inProgress?: string): Promise<MatchModel[]> {
    const result = await this.matchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (inProgress) {
      return result.filter((match) => String(match.inProgress) === inProgress);
    }

    return result;
  }

  async endMatch(id: number): Promise<boolean> {
    const [match] = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    if (match !== 1) return false;

    return true;
  }
}
