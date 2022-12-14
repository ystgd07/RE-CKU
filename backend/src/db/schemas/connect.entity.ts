import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
// import { Company } from "./company.entity";
import { User } from "./user.entity";
export enum stepEnum {
  receipt = "시작전",
  interview = "진행중",
  reward = "완료",
}
@Entity()
export class Connect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  step: stepEnum;

  @ManyToOne((type) => User, (user) => user.asMento)
  mento: User;

  @ManyToOne((type) => User, (user) => user.asMentee)
  mentee: User;
}

// 고인물에게 요청을하려면
// 1.
//
