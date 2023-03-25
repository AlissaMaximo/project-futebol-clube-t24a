import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  declare id: number;
  declare inProgress: boolean;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
}

MatchModel.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

TeamModel.hasMany(MatchModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
TeamModel.hasMany(MatchModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default MatchModel;
