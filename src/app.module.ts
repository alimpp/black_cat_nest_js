import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(pgConfig), RequestModule, FriendsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
