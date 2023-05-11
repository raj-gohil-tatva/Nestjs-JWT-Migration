import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeORMDataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST || 'localhost',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/db/migrations/*.js'],
  synchronize: false,
};

const dataSourceClass = new DataSource(typeORMDataSourceConfig);
export default dataSourceClass;
