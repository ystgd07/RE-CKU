import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne } from "typeorm";
import { Company } from "./company.entity";
import { Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";

export enum positonEnum {
  BE = "백엔드",
  FE = "프론트엔드",
  PM = "프로덕트매니저",
  FS = "풀스택",
}

@Entity()
export class Carreer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  work: string;

  @Column()
  reward: string;

  @Column()
  position: positonEnum;

  @ManyToOne((type) => Resume, (resume) => resume.carreer)
  usedResume: Resume;
}
