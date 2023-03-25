import { app } from '../app';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import LoginModel from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Fluxo Login', () => {
  afterEach(() => {
    sinon.restore();
  });
  
  it('Quando preenchido ok, retornar 200 e um token', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password:  'secret_admin'});

    expect(httpResponse.body).to.have.property('token')

    expect(httpResponse.status).to.equal(200)
});

    it('Quando sem email, retornar 400 e mensagem "All fields must be filled"', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password:  'blahblahblah'});

      expect(httpResponse.status).to.equal(400)

      expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    });

    it('Quando sem senha, retornar 400 e mensagem "All fields must be filled', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'emailnaoimportaaqui', password:  ''});

        expect(httpResponse.body).to.deep.equal({ message: 'All fields must be filled' })

        expect(httpResponse.status).to.equal(400)
      });

    it('Quando campos inválidos, retornar 401 e mensagem "Invalid email or password"', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'email@aleatorio.com', password: 'senhaerrada'});

      expect(httpResponse.status).to.equal(401)

      expect(httpResponse.body).to.deep.equal({ message: 'Invalid email or password' })
    });

    it('Quando sem token e em /login/role, retornar 401 e mensagem "Token not found"', async () => {
      sinon.stub(LoginModel, 'findOne').throws();

      const httpResponse = await chai.request(app).get('/login/role').set({ authorization: '' });

      expect(httpResponse.status).to.be.equal(401);

      expect(httpResponse.body).to.deep.equal({ message: 'Token not found' })
    });

    it('Quando com token inválido e em /login/role, retornar 401 e mensagem "Token must be a valid token"', async () => {
      sinon.stub(LoginModel, 'findOne').throws();

      const httpResponse = await chai.request(app).get('/login/role').set({ authorization: 'tokenfalso' });

      expect(httpResponse.status).to.be.equal(401);

      expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
    });
});