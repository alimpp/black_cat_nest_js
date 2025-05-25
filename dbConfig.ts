import { UserEntity } from 'src/entities/user.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { FriendsEntity } from 'src/entities/friends.entity';
import { SkillEntity } from 'src/entities/skills.entity';
import { NoteEntity } from 'src/entities/note.entity';
import { PostEntity } from 'src/entities/post.entity';
import { ProjectsEntity } from 'src/entities/projects.entity';
import { MembersEntity } from 'src/entities/members.entity';

import { File } from 'src/entities/fileEntity';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://tasks_owner:npg_0lAtiDCbwx9p@ep-purple-dream-a52au5di-pooler.us-east-2.aws.neon.tech/tasks?sslmode=require',
  type: 'postgres',
  port: 3306,
  entities: [
    UserEntity,
    RequestEntity,
    FriendsEntity,
    SkillEntity,
    NoteEntity,
    PostEntity,
    ProjectsEntity,
    MembersEntity,
    File,
  ],

  // ** synchronize in development mode should be true and in production mode should be false ** //
  synchronize: true,
};
