import { ModelStatic } from 'sequelize';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import LeaderboardUtil from '../utils/LeaderboardUtil';

const leaderBoardUtil = new LeaderboardUtil();

export default class LeaderboardService {
  protected teamModel: ModelStatic<TeamModel> = TeamModel;
  protected matchModel: ModelStatic<MatchModel> = MatchModel;

  async rankHome() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });

    const result: ILeaderboard[] = [];

    teams.forEach((team) => {
      const matchesByTeam = matches.filter((match) => match.homeTeamId === match.id);
      const results = leaderBoardUtil
        .matchResults(matchesByTeam, ['homeTeamGoals', 'awayTeamGoals']);

      result.push(leaderBoardUtil
        .rankTeam(team, results, matchesByTeam, ['homeTeamGoals', 'awayTeamGoals']));
    });

    return result;
  }
}
