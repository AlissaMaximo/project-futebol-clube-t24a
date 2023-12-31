import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Jwt from '../utils/Jwt';
import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';
import IToken from '../interfaces/IToken';

class LoginsService {
  protected userModel: ModelStatic<UserModel> = UserModel;

  async login({ email, password }: ILogin): Promise<IToken | undefined> {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) return undefined;

    const comparedPassword = bcrypt.compareSync(password, user.password);

    if (!comparedPassword) return undefined;

    const token = Jwt.buildToken(user.email);

    return { token };
  }

  async returnRole(email: string): Promise<string | undefined> {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) return undefined;

    return user.role;
  }
}

export default LoginsService;
