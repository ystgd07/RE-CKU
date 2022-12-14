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
  projectName: string;

  @Column()
  startDate: string; // YYMM

  @Column()
  finishDate: string; // YYMM

  @Column()
  infomation: string;

  @Column()
  link1: string;
  @Column()
  link2: string;

  @OneToMany((type) => Stack, (stack) => stack.project)
  stacks: Stack[];

  @ManyToOne((type) => Resume, (resume) => resume.projects)
  usedResume: Resume;
}
