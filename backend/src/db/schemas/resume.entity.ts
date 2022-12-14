import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Carreer } from "./carreer.entity";
import { Project } from "./project.entity";
import { ResumeLikeMaping } from "./resumeLikeMaping.entity";
import { User } from "./user.entity";

export enum positonEnum {
  BE = "백엔드",
  FE = "프론트엔드",
  PM = "프로덕트매니저",
  FS = "풀스택",
}
@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 200 })
  infomation: string;

  @Column({ type: "varchar" })
  year: string;

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
