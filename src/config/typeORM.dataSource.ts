import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const typeORMDataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  username: process.env.USERNAME || 'postgres',
  port: Number(process.env.PORT) || 5432,
  host: process.env.HOST || 'localhost',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

const dataSourceClass = new DataSource(typeORMDataSourceConfig);
export default dataSourceClass;
