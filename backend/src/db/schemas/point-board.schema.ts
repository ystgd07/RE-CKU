import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";

@Entity()
export class PointFromBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => User, (user) => user.getPointFromBoard)
  userId: User;

  @ManyToMany((type) => Board, (board) => board.getPoint)
  boardId: Board;
}
