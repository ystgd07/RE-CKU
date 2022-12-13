import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, OneToOne } from "typeorm";
import { Connect } from "./connect.entity";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";

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

  @Column({ length: 1000 })
  description: string;

  @OneToOne((type) => User, (user) => user.ownCompany)
  owner: User;

  @OneToMany((type) => Skill, (skill) => skill.name, { nullable: true })
  stacks: Skill[];

  @OneToMany((type) => Connect, (connect) => connect.usedCompany, { nullable: true })
  connects: Connect[];
}
