import * as path from 'path';

export const VALIDATION_PIPE_OPTIONS = { transform: true, whitelist: true };

export const GLOBAL_PREFIX = 'api/v1';
export const ENV_FILE_PATH = '.env';
export const ENTITIES_PATH = path.join(
  process.cwd(),
  'dist',
  '**',
  '*.entity{.ts,.js}',
);

export const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';
export const INTERNAL_SERVER_ERROR_NAME = 'InternalException';

export enum ConfigVariables {
  PORT = 'port',
  DB_TYPE = 'postgres',
  DB_HOST = 'db.host',
  DB_PORT = 'db.port',
  DB_NAME = 'db.name',
  DB_USER = 'db.user',
  DB_PASS = 'db.pass',
}
