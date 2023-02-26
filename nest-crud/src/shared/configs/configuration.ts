import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { ConfigVariables, ENTITIES_PATH } from '../constants';

export const envConfiguration = () => ({
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
});

export const typeORMConfigurations = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  database: configService.get<string>(ConfigVariables.DB_NAME),
  username: configService.get<string>(ConfigVariables.DB_USER),
  password: configService.get<string>(ConfigVariables.DB_PASS),
  host: configService.get<string>(ConfigVariables.DB_HOST),
  port: configService.get<number>(ConfigVariables.DB_PORT),
  type: ConfigVariables.DB_TYPE,
  entities: [ENTITIES_PATH],
  synchronize: true,
});
