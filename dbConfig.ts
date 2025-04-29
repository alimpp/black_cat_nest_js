import { UserEntity } from 'src/entities/user.entity';
import { RequestEntity } from 'src/entities/request.entity';
import { FriendsEntity } from 'src/entities/friends.entity';
import { SkillEntity } from 'src/entities/skills.entity';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  url: 'postgresql://taskholder_owner:npg_o2QdYFlMzN6r@ep-shiny-union-a4xlmzr5-pooler.us-east-1.aws.neon.tech/taskholder?sslmode=require',
  type: 'postgres',
  port: 3306,
  entities: [UserEntity, RequestEntity, FriendsEntity, SkillEntity],

  // ** synchronize in development mode should be true and in production mode should be false ** //
  synchronize: true,
};
