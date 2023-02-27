import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://de0978:QxaWdAax9eGLDE5J@cluster0.sablhsh.mongodb.net/?retryWrites=true&w=majority',
    ),
    TodoModule,
  ],
})
export class AppModule {}
