import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMDataSourceConfig } from './config/typeORM.dataSource';
import { userModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMDataSourceConfig), userModule],
})
export class AppModule {}
