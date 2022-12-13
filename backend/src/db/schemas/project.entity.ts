import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Resume } from "./resume.entity";
import { Skill } from "./skill.entity";
import { Stack } from "./stacks.entity";
import { User } from "./user.entity";
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project: string;

  @Column()
  infomation: string;

  @Column()
  imgUrl: string;

  @Column()
  link1: string;
  @Column()
  link2: string;
  @Column()
  link3: string;

  @ManyToOne((type) => Resume, (resume) => resume.projects)
  usedResume: Resume;
}
