import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { BoardLikeMaping } from "./boardLikeMaping.entity";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @OneToMany((type) => BoardLikeMaping, (board) => board.board) // 좋아하고있는 유저들
  likesBoard: BoardLikeMaping[];

  @OneToMany((type) => Comment, (comment) => comment.board) // 좋아하고있는 유저들
  ownComments: Comment[];

  @ManyToOne((type) => User, (user) => user.notices) // 누구의 게시물
  fromUser: User[];
}
