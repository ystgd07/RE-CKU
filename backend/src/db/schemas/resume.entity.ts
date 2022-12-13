import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Skill } from "./skill.entity";
import { Stack } from "./stacks.entity";

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Stack, (stack) => stack.resume_id)
  stacks: Skill[];
}
