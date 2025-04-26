import { Module, ValidationPipe } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from 'src/entities/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity])],
  controllers: [RequestController],
  providers: [RequestService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ]
})
export class RequestModule {}
