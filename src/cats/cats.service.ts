import { Cat, CatDocument } from './schema/cat.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  // create(createCatDto: CreateCatDto) {
  //   this.cats.push(createCatDto);
  // }

  // findAll(): Cat[] {
  //   return this.cats;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} cat`;
  // }

  // update(id: number, updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cat`;
  // }
}
