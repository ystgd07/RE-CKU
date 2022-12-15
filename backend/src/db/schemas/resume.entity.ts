import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Board } from "./board.entity";
import { Carreer } from "./carreer.entity";
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

  @OneToMany((type) => Board, (board) => board.hasResume)
  usedBoards: Board[];

  @OneToMany((type) => Project, (project) => project.usedResume)
  projects: Project[];

  @OneToMany((type) => Carreer, (carreer) => carreer.usedResume)
  carreer: Carreer[];

  @OneToMany((type) => ResumeLikeMaping, (resume) => resume.resume)
  likesResume: ResumeLikeMaping[];

  @ManyToOne((type) => User, (user) => user.resumes)
  usedUser: User;
}
