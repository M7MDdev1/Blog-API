import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ['src/migration/*{.ts,.js}'],
  entities: ['src/**/*.entity{.ts,.js}'],
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;
