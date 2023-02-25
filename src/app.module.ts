import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsService } from './cats/cats.service';
import { CatsController } from './cats/cats.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats/schema/cat.schema';

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://de0978:QxaWdAax9eGLDE5J@cluster0.sablhsh.mongodb.net/nest?retryWrites=true&w=majority',
    ),
  ],
  // controllers: [CatsController],
  // providers: [CatsService],
})
export class AppModule {}
