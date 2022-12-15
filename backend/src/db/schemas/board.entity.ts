import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BoardLikeMaping } from "./boardLikeMaping.entity";
import { Comment } from "./comment.entity";
import { Resume } from "./resume.entity";
import { User } from "./user.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  content: string;

  @Column({ default: null, nullable: true })
  hashTags: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @ManyToOne((type) => Resume, (resume) => resume.usedBoards, { nullable: true }) // 좋아하고있는 유저들
  hasResume: Resume | null;

  @OneToMany((type) => BoardLikeMaping, (board) => board.board) // 좋아하고있는 유저들
  likesBoard: BoardLikeMaping[];

  @OneToMany((type) => Comment, (comment) => comment.board) // 좋아하고있는 유저들
  ownComments: Comment[];

  @ManyToOne((type) => User, (user) => user.notices) // 누구의 게시물
  fromUser: User[];
}
