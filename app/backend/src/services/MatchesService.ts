/* import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export default class MatchService {
  protected matchModel : ModelStatic<Match> = Match;
  protected teamModel : ModelStatic<TeamModel> = TeamModel;

  async getAll(): Promise<Match[]> {
    const result = await this.matchModel.findAll({
      attributes: {
        exclude: ['home_team_id', 'away_team_id'],
      },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return result;
  }
}
 */
