import { Repository } from 'typeorm';
// import { BoardRepository } from './board.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Auth } from 'src/auth/entities/auth.entity';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: Auth,
  ): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.save({ title, description, user });
    console.log(board);
    return board;
  }

  async getAllBoards(user: Auth): Promise<Board[]> {
    // repository api
    // return this.boardRepository.findBy({ user });
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :uid', { uid: user.id });
    const boards = await query.getMany();
    return boards;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    console.log(result.affected);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }
}
