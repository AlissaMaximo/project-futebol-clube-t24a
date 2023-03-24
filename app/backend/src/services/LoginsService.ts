import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Jwt from '../utils/Jwt';
import ILogin from '../interfaces/ILogin';
import LoginModel from '../database/models/LoginModel';

class LoginsService {
  protected loginModel: ModelStatic<LoginModel> = LoginModel;

  async login({ email, password }: ILogin) {
    const user = await this.loginModel.findOne({ where: { email } });

    if (!user) return undefined;

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) return undefined;

    const token = Jwt.buildToken(user.email);

    return { token };
  }

  async returnRole(email: string) {
    const user = await this.loginModel.findOne({ where: { email } });

    if (!user) return undefined;

    return user.role;
  }
}

export default LoginsService;
