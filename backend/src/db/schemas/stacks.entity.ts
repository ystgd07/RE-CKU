import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Project } from "./project.entity";
// import { Company } from "./company.entity";
import { Resume } from "./resume.entity";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";

@Entity()
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Project, (project) => project.stacks)
  projectId: Project;

  @ManyToOne((type) => Skill, (skill) => skill.id)
  skillId: Skill;
}
