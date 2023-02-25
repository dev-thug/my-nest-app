import { Query, Resolver } from '@nestjs/graphql';
@Resolver('Cat')
export class CatResolver {
  @Query()
  async listCats() {
    return [
      {
        id: '1',
        name: '키티',
        age: '2',
        bread: '사료',
      },
      {
        id: '3',
        name: '키티2',
        age: '2',
        bread: '사료',
      },
      {
        id: '5',
        name: '키티6',
        age: '2',
        bread: '사료',
      },
    ];
  }
}
