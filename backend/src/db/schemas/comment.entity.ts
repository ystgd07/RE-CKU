import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Board } from "./board.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @ManyToOne((type) => User, (user) => user.writeComments)
  user: User[];

  @ManyToOne((type) => Board, (board) => board.ownComments)
  board: Board[];
}
