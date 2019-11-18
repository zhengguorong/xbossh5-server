import { Service } from 'egg';

export default class Code extends Service {
  public async send(phone: string): Promise<any> {
    const code = this.generate();
    return await this.ctx.model.Code.create({ phone, code });
  }

  public async verify(phone: string, code: number): Promise<boolean> {
    const result = await this.ctx.model.Code.findOne({ phone }).sort({ date: -1 });
    if (!result || Date.now() - result.date > 5 * 60 * 1000 || result.code !== code) {
      return false;
    } else {
      return true;
    }
  }

  public generate(len: number = 6) {
    let result: string = '';
    for (let i = 0; i < len; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }
}
