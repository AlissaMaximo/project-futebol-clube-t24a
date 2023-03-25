import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import TeamsService from '../services/TeamsService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Fluxo Leaderboard', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('getAll', async () => {
      const getTeamsResult = await chai.request(app).get('/leaderboard/home');
  });
});
