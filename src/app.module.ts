import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMDataSourceConfig } from './config/typeORM.dataSource';
import { userModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTConfig } from './config/JWT.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMDataSourceConfig),
    JwtModule.register({
      // Registering the JwtModule as global to make things easier. This means that we don't need to import the JwtModule anywhere else in our application.
      global: true,
      secret: JWTConfig.JWTSecretKey,
      signOptions: {
        expiresIn: JWTConfig.TimeExpiry,
      },
    }),
    userModule,
  ],
})
export class AppModule {}
