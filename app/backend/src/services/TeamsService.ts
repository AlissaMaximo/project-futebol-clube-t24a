import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

export default class TeamsService {
  protected model: ModelStatic<TeamModel> = TeamModel;

  public async getAll() {
    const result = await this.model.findAll();

    return result;
  }

  public async getById(id: number) {
    const result = await this.model.findByPk(id);

    return result;
  }
}
