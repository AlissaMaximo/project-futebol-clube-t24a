import { ModelStatic } from 'sequelize';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import ILeaderboard from '../interfaces/ILeaderboard';
import LeaderboardUtil from '../utils/LeaderboardUtil';

const { matchResults, rankTeam, orderRank } = new LeaderboardUtil();

export default class LeaderboardService {
  protected teamModel: ModelStatic<TeamModel> = TeamModel;
  protected matchModel: ModelStatic<MatchModel> = MatchModel;

  async rank(isTHome: boolean) {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });

    const leaderboard: ILeaderboard[] = await [];

    await teams.forEach((team) => {
      const homeArray = ['homeTeamGoals', 'awayTeamGoals'];
      const awayArray = ['awayTeamGoals', 'homeTeamGoals'];

      const matchesByTeam = isTHome
        ? matches.filter((match) => match.homeTeamId === team.id)
        : matches.filter((match) => match.awayTeamId === team.id);

      const results = isTHome
        ? matchResults(matchesByTeam, homeArray)
        : matchResults(matchesByTeam, awayArray);

      if (isTHome) leaderboard.push(rankTeam(team, results, matchesByTeam, homeArray));
      if (!isTHome) leaderboard.push(rankTeam(team, results, matchesByTeam, awayArray));
    });

    return orderRank(leaderboard);
  }
}
