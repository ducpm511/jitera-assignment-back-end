require('dotenv').config()
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from 'config';

const postgresConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('postgresConfig');

export const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['build/src/entities/**/*.entity.js'],
  migrations: ['build/src/migrations/**/*{.ts,.js}'],
  subscribers: ['build/src/subscribers/**/*{.ts,.js}'],
});

