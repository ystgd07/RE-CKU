import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
// import { Company } from "./company.entity";
import { Connect } from "./connect.entity";
import { Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";
import { Board } from "./board.entity";
import { Comment } from "./comment.entity";

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

  @Column({ unique: true, nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: roleEnum, default: roleEnum.bronze })
  role: roleEnum;

  @Column({ nullable: true, default: null })
  RT: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column({ default: true })
  active: boolean;

  @OneToMany((type) => Resume, (resume) => resume.usedUser, { nullable: true })
  resumes: Resume[];

  @OneToMany((type) => Board, (board) => board.fromUser, { nullable: true })
  notices: Board[]; // 작성한 게시글

  @OneToMany((type) => Board, (board) => board.fromUser, { nullable: true })
  likeNotice: Board[]; // 좋아하는 게시글

  @OneToMany((type) => Comment, (comment) => comment.fromUser, { nullable: true })
  ownComments: Comment[];

  @OneToMany((type) => Connect, (connect) => connect.mento, { nullable: true })
  asMento: Connect[];

  @OneToMany((type) => Connect, (connect) => connect.mentee, { nullable: true })
  asMentee: Connect[];

  @OneToMany((type) => Stack, (stack) => stack.user_id, { nullable: true })
  stacks: Stack[];
  //기업회원 전용
  // @OneToOne((type) => Company, (company) => company.owner)
  // ownCompany: Company;
}
