'use strict';
import { Context } from 'egg';
import jwt from 'jsonwebtoken';

export default function authMiddleWare(): any {
  async function isLogin(ctx: Context, next: () => Promise<any>) {
    const token = ctx.request.header.authorization;
    if (!token) {
      ctx.response.status = 401;
      ctx.response.body = 'token不能为空';
      return;
    }
    // 验证token是否过期
    try {
      const info = jwt.verify(
        token.split('Bearer ')[1],
        ctx.app.config.jwtSecret,
      );
      const { exp, phone, role } = info;
      const now = Date.now();
      // 有效期小于一小时的重新颁发token
      const shouldBeExpires = exp - now < 60 * 60 * 1000;
      if (shouldBeExpires) {
        const token = jwt.sign({ phone, role }, ctx.app.config.jwtSecret, {
          expiresIn: '7d',
        });
        ctx.set('authorization', 'Bearer ' + token);
      }
    } catch (err) {
      ctx.response.status = 401;
      // token过期
      if (err.name === 'TokenExpiredError') {
        ctx.response.body = 'token过期';
      } else if (err.name === 'JsonWebTokenError') {
        ctx.response.body = 'token无效';
      }
      return;
    }
    await next();
  }

  return {
    isLogin,
  };
}
