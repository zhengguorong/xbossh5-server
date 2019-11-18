import { Controller } from 'egg';
import * as jwt from 'jsonwebtoken';

export default class UserController extends Controller {
  public async login() {
    const { ctx, service, config } = this;
    const { phone, code } = ctx.request.body;
    const isValid = await service.code.verify(phone, code);
    if (isValid) {
      const token = jwt.sign({ phone }, config.jwtSecret, {
        expiresIn: '7d',
      });
      ctx.set('authorization', 'Bearer ' + token);
      ctx.body = { code: 0, message: '登陆成功' };
    } else {
      ctx.body = { code: 10001, message: '验证码错误' };
    }
  }

  public async sendCode() {
    const { ctx, service } = this;
    const { phone } = ctx.request.body;
    await service.code.send(phone);
    ctx.body = { code: 0, message: '发送成功' };
  }
}
