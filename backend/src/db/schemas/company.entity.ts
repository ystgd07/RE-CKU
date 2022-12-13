import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { Skill } from "./skill.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column()
  name: string;

  @ManyToMany((type) => Skill, (skill) => skill.name, { nullable: true })
  stacks: Skill[];
}
