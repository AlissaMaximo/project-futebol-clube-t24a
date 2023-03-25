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

    it('getAll', async () => {
      const getTeamsResult = await chai.request(app).get('/teams');

      expect(getTeamsResult.status).to.be.equal(200);
      expect(getTeamsResult.body.length).to.be.equal(16);
      expect(getTeamsResult.body).to.be.an('array');
  });

    it('getById', async () => {
    const getTeamResult = await chai.request(app).get('/teams/3');

    expect(getTeamResult.status).to.be.equal(200);
    expect(getTeamResult.body).to.be.an('object');
    expect(getTeamResult.body).to.eql({ id: 3, teamName: "Botafogo" })
  });
});
