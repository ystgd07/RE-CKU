import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
// import { Company } from "./company.entity";
import { Resume } from "./resume.entity";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";

@Entity()
export class Stack {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.stacks)
  user_id: User;

  @ManyToOne((type) => Resume, (resume) => resume.stacks)
  resume_id: Resume;

  @ManyToOne((type) => Skill, (skill) => skill.stacks)
  skill_id: Skill;
  // @ManyToOne((type) => Company, (company) => company.stacks, { nullable: true })
  // company_id: Company;
}
