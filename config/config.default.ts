import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573210693433_4866';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/xbossh5',
    options: { useUnifiedTopology: true },
  };

  config.jwtSecret = 'xbossh5';

  config.onerror = {
    json(err, ctx) {
      ctx.sattus = 400;
      ctx.body = err;
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
