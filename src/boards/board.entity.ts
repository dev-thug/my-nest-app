import { BoardStatus } from './board-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: BoardStatus.PUBLIC })
  status: BoardStatus;

  @ManyToOne((type) => Auth, (user) => user.boards, { eager: false })
  user: Auth;
}
