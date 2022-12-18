import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne } from "typeorm";
import { positonEnum, Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  company: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: false, default: false })
  notDevlop: boolean; // 비개발경력, true: 비개발, false: 개발

  @Column({ nullable: false, default: false })
  workNow: boolean; // 재직 상태, true: 재직, false: 재직x

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column({ nullable: true, length: 200 })
  reward: string;

  @ManyToOne((type) => Resume, (resume) => resume.career, { nullable: false })
  usedResume: Resume;
}

export type TypeCareer = {
  id: number;
  company: string;
  position: string;
  notDevlop: boolean;
  workNow: boolean;
  startDate: string;
  endDate: string;
  reward: string;
  usedResumeId: number;
};
