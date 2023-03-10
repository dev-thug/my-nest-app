import { Auth } from './../auth/entities/auth.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';
import * as config from 'config';

const dbConfig = config.get('db');
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],
  entities: [Board, Auth],
  synchronize: true,
};
