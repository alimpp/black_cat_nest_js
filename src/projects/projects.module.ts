import { Module, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from 'src/entities/projects.entity';

import { MembersService } from 'src/members/members.service';
import { MembersEntity } from 'src/entities/members.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity, MembersEntity])],
  providers: [
    ProjectsService,
    MembersService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
