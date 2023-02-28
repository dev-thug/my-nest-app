import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver('Todo')
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation('createTodo')
  // async create(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
  async create(
    @Args('title') title: string,
    @Args('description') description: string,
  ) {
    const createTodoInput = { title, description };
    return await this.todoService.create(createTodoInput);
  }

  @Query('listTodo')
  async findAll() {
    return await this.todoService.findAll();
  }

  @Query('todo')
  findOne(@Args('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation('updateTodo')
  async update(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return await this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation('removeTodo')
  async remove(@Args('id') id: string) {
    return await this.todoService.remove(id);
  }
}
