import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, OneToOne } from "typeorm";
import { Skill } from "./skill.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Column()
  companyName: string;

  @Column()
  boss: string;

  @Column()
  openDay: number; // 또는 Date

  @Column()
  businessNumber: number;

  @Column()
  description: string;

  @OneToOne((type) => User, (user) => user.ownCompany)
  owner: User;

  @OneToMany((type) => Skill, (skill) => skill.name, { nullable: true })
  stacks: Skill[];
}
