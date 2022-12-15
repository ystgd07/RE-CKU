import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Board } from "./board.entity";
import { Career } from "./career.entity";
import { Project } from "./project.entity";
import { ResumeLikeMaping } from "./resumeLikeMaping.entity";
import { User } from "./user.entity";

export enum positonEnum {
  BE = "BE",
  FE = "FE",
  PM = "PM",
  FS = "FS",
}
@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true, length: 200 })
  infomation: string;

  @Column({ nullable: true })
  position: positonEnum;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @OneToMany((type) => Board, (board) => board.hasResume)
  usedBoards: Board[];

  @OneToMany((type) => Project, (project) => project.usedResume)
  projects: Project[];

  @OneToMany((type) => Career, (career) => career.usedResume)
  career: Career[];

  @OneToMany((type) => ResumeLikeMaping, (resume) => resume.resume)
  likesResume: ResumeLikeMaping[];

  @ManyToOne((type) => User, (user) => user.resumes)
  usedUser: User;
}
