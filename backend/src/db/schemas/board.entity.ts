import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { BoardLikeMaping } from "./boardLikeMaping.entity";
import { Comment } from "./comment.entity";
import { PointFromBoard } from "./point-board.schema";
import { Resume } from "./resume.entity";
import { User } from "./user.entity";

export type BoardInfo = {
  id: string;
  title: string;
  content: string;
  hashTags: string;
  boardCreated: Date;
  hasResumeId: number;
  fixed: boolean;
  ownUserId: number;
};

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

  @Column({ default: false })
  fixed: boolean;

  @Column({ default: 0 })
  likeCnt: number;

  @Column({ default: 0 })
  commentCnt: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

<<<<<<< HEAD
  @OneToMany((type) => PointFromBoard, (point) => point.board)
=======
  @OneToMany((type) => PointFromBoard, (point) => point.boardId)
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
  getPoint: PointFromBoard[];

  @OneToMany((type) => BoardLikeMaping, (board) => board.board) // 좋아하고있는 유저들
  likesBoard: BoardLikeMaping[];

  @OneToMany((type) => Comment, (comment) => comment.board) // 좋아하고있는 유저들
  ownComments: Comment[];

  @ManyToOne((type) => User, (user) => user.notices) // 누구의 게시물
  fromUser: User[];

  @ManyToOne((type) => Resume, (resume) => resume.usedBoards, { nullable: true }) // 좋아하고있는 유저들
  hasResume: Resume | null;
}
