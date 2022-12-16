import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne } from "typeorm";
import { positonEnum, Resume } from "./resume.entity";
import { Stack } from "./stacks.entity";

@Entity()
export class Carreer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column({ length: 200 })
  reward: string;

  @Column()
  notDevlop: boolean; // 비개발경력

  @Column()
  workNow: boolean;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ nullable: false })
  position: positonEnum;

  @ManyToOne((type) => Resume, (resume) => resume.carreer, { nullable: false })
  usedResume: Resume;
}
