import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Carreer } from "./carreer.entity";
import { Project } from "./project.entity";
import { Skill } from "./skill.entity";
import { Stack } from "./stacks.entity";
import { User } from "./user.entity";
@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  infomation: string;

  @OneToMany((type) => Project, (project) => project.usedResume)
  projects: Project[];

  @OneToMany((type) => Stack, (stack) => stack.resume_id)
  stacks: Skill[];

  @OneToMany((type) => Carreer, (carreer) => carreer.usedResume)
  carreer: Carreer[];

  @ManyToOne((type) => User, (user) => user.resumes)
  usedUser: User;
}
