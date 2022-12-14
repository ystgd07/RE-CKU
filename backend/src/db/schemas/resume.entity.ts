import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
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

  @Column()
  name: string;

  @Column({ length: 200 })
  infomation: string;

  @Column()
  position: positonEnum;

  @OneToMany((type) => Project, (project) => project.usedResume)
  projects: Project[];

  @OneToMany((type) => Carreer, (carreer) => carreer.usedResume)
  carreer: Carreer[];

  @OneToMany((type) => ResumeLikeMaping, (resume) => resume.resume)
  likesResume: ResumeLikeMaping[];

  @ManyToOne((type) => User, (user) => user.resumes)
  usedUser: User;
}
