import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import TeamsService from '../services/TeamsService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Fluxo Team', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('getAll: Service', async () => {

      const teams :TeamModel[] = [ new TeamModel({ id: 1, teamName: 'TimeDoTeste' }) ];
      const teamService = new TeamsService();
      const result = await teamService.getAll();

      sinon.stub(TeamModel, 'findAll').resolves(teams);

      expect(result).to.be.deep.eq(teams);
      expect(result.length).to.be.eq(1);
      expect(result).to.be.an('array');
  });

    it('getById: Service', async () => {
    const teams :TeamModel = new TeamModel({ id: 1, teamName: 'TimeDoTeste' });
    const teamService = new TeamsService();
    const result = await teamService.getById(1);

    sinon.stub(TeamModel, 'findByPk').resolves(teams);

    expect(result).to.be.deep.eq(teams);
    expect(result).to.be.an('object');
  });

    it('getAll: Controller', async () => {
    const teams :TeamModel[] = [ new TeamModel({ id: 1, teamName: 'TimeDoTeste' }) ];
    const result = await chai.request(app).get('/teams');

    sinon.stub(TeamModel, 'findAll').resolves(teams);

    expect(result).to.be.an('object');
    expect(result.body).to.be.an('array');
    expect(result.body).to.be.deep.eq(teams.map((team) => team.dataValues));
  });

    it('getById: Controller', async () => {
    const teams :TeamModel = new TeamModel({ id: 1, teamName: 'TimeDoTeste' });
    const result = await chai.request(app).get('/teams/1');

    sinon.stub(TeamModel, 'findByPk').resolves(teams);

    expect(result).to.be.an('object');
    expect(result.body).to.be.an('object');
    expect(result.body).to.be.deep.eq(teams.dataValues);
  });
});
