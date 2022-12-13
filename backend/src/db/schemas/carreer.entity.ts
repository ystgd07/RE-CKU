import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne } from "typeorm";
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

  @Column({ length: 100 })
  work: string;

  @Column({ length: 200 })
  reward: string;

  @Column({ nullable: false })
  position: positonEnum;

  @ManyToOne((type) => Resume, (resume) => resume.carreer, { nullable: false })
  usedResume: Resume;
}
