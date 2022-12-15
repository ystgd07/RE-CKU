import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Resume } from "./resume.entity";
import { Skill } from "./skill.entity";
import { Stack } from "./stacks.entity";
import { User } from "./user.entity";
@Entity()
export class ResumeLikeMaping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.likesResume)
  user: User;

  @ManyToOne((type) => Resume, (resume) => resume.likesResume)
  resume: Resume;
}
