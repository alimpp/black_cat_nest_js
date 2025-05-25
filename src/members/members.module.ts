import { Module, ValidationPipe } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersEntity } from 'src/entities/members.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MembersEntity])],
  providers: [MembersService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
  controllers: [MembersController]
})
export class MembersModule {}
