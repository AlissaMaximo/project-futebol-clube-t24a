import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardUtil {
  public matchResults = (matches: MatchModel[], teamGoals: string[]) => {
    const key1 = `${teamGoals[0]}` as 'awayTeamGoals' | 'homeTeamGoals';
    const key2 = `${teamGoals[1]}` as 'awayTeamGoals' | 'homeTeamGoals';

    return matches.map((match) => {
      if (match[key1] > match[key2]) return 'victory';
      if (match[key1] === match[key2]) return 'draw';

      return 'loss';
    }) as string[];
  };

  public count = (outcome: string, results: string[]) =>
    results.reduce((a, c) => a + (c === outcome ? 1 : 0), 0);

  public rankTeam = (team: TeamModel, res: string[], matByTeam: MatchModel[], tGoals: string[]) => {
    const key1 = `${tGoals[0]}` as 'awayTeamGoals' | 'homeTeamGoals';
    const key2 = `${tGoals[1]}` as 'awayTeamGoals' | 'homeTeamGoals';
    const goalsFavor = matByTeam.reduce((a, c) => a + c[`${key1}`], 0);
    const goalsOwn = matByTeam.reduce((a, c) => a + c[`${key2}`], 0);
    const points = this.count('victory', res) * 3 + this.count('draw', res);
    const efficiency = (100 * (points / (res.length * 3))).toFixed(2);

    return {
      name: team.teamName,
      totalPoints: points,
      totalGames: res.length,
      totalVictories: this.count('victory', res),
      totalDraws: this.count('draw', res),
      totalLosses: this.count('loss', res),
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: +efficiency,
    };
  };

  public resolve = (n1: number, n2: number) => {
    if (n1 > n2) return 1;
    return -1;
  };

  public orderRank = (leaderboard: ILeaderboard[]) => {
    leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return this.resolve(b.totalPoints, a.totalPoints);
      if (b.totalVictories !== a.totalVictories) {
        return this.resolve(b.totalVictories, a.totalVictories);
      }
      if (b.goalsBalance !== a.goalsBalance) return this.resolve(b.goalsBalance, a.goalsBalance);
      if (b.goalsFavor !== a.goalsFavor) return this.resolve(b.goalsFavor, a.goalsFavor);
      return this.resolve(b.goalsOwn, a.goalsOwn);
    });

    return leaderboard;
  };
}
