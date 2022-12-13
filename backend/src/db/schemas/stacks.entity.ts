import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Company } from "./company.entity";
import { Resume } from "./resume.entity";
import { Skill } from "./skill.entity";

@Entity()
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Company, (company) => company.stacks, { nullable: true })
  company_id: Company;

  @ManyToOne((type) => Resume, (resume) => resume.stacks)
  resume_id: Resume;
  @ManyToOne((type) => Skill, (skill) => skill.stacks)
  skill_id: Skill;
}
