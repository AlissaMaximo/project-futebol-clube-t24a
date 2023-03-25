import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import IMatchResults from '../interfaces/IMatchResults';

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

  public async updateMatch(id: number, matchResults: IMatchResults): Promise<MatchModel> {
    const { homeTeamGoals, awayTeamGoals } = matchResults;

    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    const updatedMatch = await this.matchModel.findOne({ where: { id } });

    return updatedMatch as MatchModel;
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise <MatchModel | boolean> {
    const findHomeTeamId = await this.matchModel.findOne({ where: { homeTeamId } });
    const findAwayTeamId = await this.matchModel.findOne({ where: { awayTeamId } });

    if (!findAwayTeamId || !findHomeTeamId) return false;

    const newMatch = await this.matchModel
      .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });

    return newMatch;
  }
}
