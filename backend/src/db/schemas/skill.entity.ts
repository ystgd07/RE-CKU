import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  @OneToMany((type) => Stack, (stack) => stack.skillId)
  id: number;

  @Column()
  name: string;
}
