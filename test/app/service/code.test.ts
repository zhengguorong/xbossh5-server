import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Code.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('send and verify', async () => {
    const phone = '18664694721';
    const result = await ctx.service.code.send(phone);
    const { code } = result;
    let isVerify = await ctx.service.code.verify(phone, code);
    assert(isVerify === true);
    isVerify = await ctx.service.code.verify(phone, 1234);
    assert(isVerify === false);
  });
});
