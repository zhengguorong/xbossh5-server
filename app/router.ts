import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // const auth = app.middleware.auth;
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.login);
  router.post('/user/sendCode', controller.user.sendCode);
};
