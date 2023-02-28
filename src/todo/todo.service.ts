import { Todo, TodoDocument } from './schemas/todo.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  async create(createTodoInput: CreateTodoInput) {
    const createdTodo = new this.todoModel(createTodoInput);
    return await createdTodo.save();
    // return 'This action adds a new todo';
  }

  async findAll() {
    return await this.todoModel.find().exec();
    // return `This action returns all todo`;
  }

  async findOne(id: string) {
    return await this.todoModel.findById(id);
    // return `This action returns a #${id} todo`;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    console.log(`This action updates a #${id} todo`);

    return await this.todoModel.findOneAndUpdate({ id }, updateTodoInput, {
      new: true,
    });
  }

  async remove(id: string) {
    console.log(`This action removes a #${id} todo`);
    const deletedTodo = await this.todoModel.deleteOne({ id });
    return !!deletedTodo;
  }
}
