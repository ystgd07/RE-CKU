import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";

@Entity()
export class PointFromBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.getPointFromBoard)
  user: User;

  @ManyToOne((type) => Board, (board) => board.getPoint)
  board: Board;
}
