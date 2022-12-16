import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
// import { Company } from "./company.entity";
import { Connect } from "./connect.entity";
import { Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";
import { Board } from "./board.entity";
import { Comment } from "./comment.entity";
import { ResumeLikeMaping } from "./resumeLikeMaping.entity";
import { BoardLikeMaping } from "./boardLikeMaping.entity";

export enum roleEnum {
  bronze = "브론즈",
  silver = "실버",
  gold = "골드",
  platinum = "플레티넘",
  diamond = "다이아몬드",
  master = "마스터",
  ADMIN = "관리자",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: true, default: null })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ default: "zz" })
  avatarUrl: string;

  @Column({ type: "enum", enum: roleEnum, default: roleEnum.bronze })
  role: roleEnum;

  @Column({ nullable: true, default: null })
  RT: string;

  @Column({ default: 0 })
  point: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column({ default: true })
  active: boolean;

  @OneToMany((type) => Resume, (resume) => resume.usedUser, { nullable: true })
  resumes: Resume[];

  @OneToMany((type) => Board, (board) => board.fromUser, { nullable: true })
  notices: Board[]; // 작성한 게시글

  @OneToMany((type) => BoardLikeMaping, (board) => board.user, { nullable: true })
  likesBoard: BoardLikeMaping[]; // 좋아하는 게시글 맵핑

  @OneToMany((type) => ResumeLikeMaping, (resume) => resume.user)
  likesResume: ResumeLikeMaping[]; //  좋아하는 이력서 맵핑

  @OneToMany((type) => Comment, (comment) => comment.user, { nullable: true })
  writeComments: Comment[];

  @OneToMany((type) => Connect, (connect) => connect.mento, { nullable: true })
  asMento: Connect[];

  @OneToMany((type) => Connect, (connect) => connect.mentee, { nullable: true })
  asMentee: Connect[];
}
