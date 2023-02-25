import { CatResolver } from './resolver/cat.resolver';
import { Global, Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat } from './entities/cat.entity';
import { CatSchema } from './schema/cat.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService, CatResolver],
  exports: [CatsService],
})
export class CatsModule {}
