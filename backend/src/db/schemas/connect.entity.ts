import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Company } from "./company.entity";
import { Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";
import { User } from "./user.entity";
export enum stepEnum {
  receipt = "접수",
  interview = "면접",
  employ = "채용",
}
@Entity()
export class Connect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: stepEnum;

  @ManyToOne((type) => User, (user) => user.connects)
  usedUser: User;

  @ManyToOne((type) => Company, (company) => company.connects)
  usedCompany: User;
}
