import { ModelStatic } from 'sequelize';
import TeamModel from '../database/models/TeamModel';

export default class TeamsService {
  protected model: ModelStatic<TeamModel> = TeamModel;

  async getAll(): Promise<TeamModel[]> {
    const result = await this.model.findAll();

    return result;
  }

  async getById(id: number): Promise<TeamModel | null> {
    const result = await this.model.findByPk(id);

    return result;
  }
}
