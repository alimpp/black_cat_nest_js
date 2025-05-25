import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { FriendsModule } from './friends/friends.module';
import { SkillModule } from './skill/skill.module';
import { NoteModule } from './note/note.module';
import { FileModule } from './file/file.module';
import { PostsModule } from './posts/posts.module';
import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(pgConfig), RequestModule, FriendsModule, SkillModule, NoteModule, FileModule, PostsModule, ProjectsModule, MembersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
