import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Board } from "./board.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: false })
  fixed: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  // @OneToMany((type)=> )

  @ManyToOne((type) => User, (user) => user.writeComments)
  user: User[];

  @ManyToOne((type) => Board, (board) => board.ownComments)
  board: Board[];
}
