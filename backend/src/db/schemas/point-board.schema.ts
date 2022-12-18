import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Board } from "./board.entity";
import { User } from "./user.entity";

@Entity()
export class PointFromBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.getPointFromBoard)
<<<<<<< HEAD
  user: User;

  @ManyToOne((type) => Board, (board) => board.getPoint)
  board: Board;
=======
  userId: User;

  @ManyToOne((type) => Board, (board) => board.getPoint)
  boardId: Board;
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
}
