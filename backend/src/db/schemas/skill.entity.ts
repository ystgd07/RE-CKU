import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Company } from "./company.entity";
import { Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Stack, (stack) => stack.skill_id)
  stacks: Stack;
}
