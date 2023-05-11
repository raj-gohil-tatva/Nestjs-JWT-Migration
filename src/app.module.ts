import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMDataSourceConfig } from './config/typeORM.dataSource';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMDataSourceConfig)],
})
export class AppModule {}
