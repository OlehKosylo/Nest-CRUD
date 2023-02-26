import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { envConfiguration } from './configuration';
import { ENV_FILE_PATH } from '../constants';

export const configurationModuleOptions: ConfigModuleOptions = {
  envFilePath: ENV_FILE_PATH,
  load: [envConfiguration],
  validationSchema: Joi.object({
    PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
  }),
};
