import { Module, ValidationPipe } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/entities/note.entity';

import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity, UserEntity])],
  providers: [NoteService, UsersService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  controllers: [NoteController]
})
export class NoteModule {}
