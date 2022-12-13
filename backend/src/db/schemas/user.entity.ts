import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import { Company } from "./company.entity";
import { Connect } from "./connect.entity";
import { Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";
import { Board } from "./board.entity";
import { Comment } from "./comment.entity";

export enum roleEnum {
  COMPANY = "기업",
  USER = "개인",
  ADMIN = "관리자",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: roleEnum })
  role: roleEnum;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column()
  active: boolean;

  @OneToMany((type) => Resume, (resume) => resume.usedUser, { nullable: true })
  resumes: Resume[];

  @OneToMany((type) => Board, (board) => board.fromUser, { nullable: true })
  notices: Board[]

  @OneToMany((type) => Comment, (comment) => comment.fromUser, { nullable: true })
  ownComments : Comment[]

  @OneToMany((type) => Connect, (connect) => connect.usedUser, { nullable: true })
  connects: Connect[];

  @OneToMany((type) => Stack, (stack) => stack.user_id, { nullable: true })
  stacks: Stack[];
  //기업회원 전용
  @OneToOne((type) => Company, (company) => company.owner)
  ownCompany: Company;
}
