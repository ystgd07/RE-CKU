import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Company } from "./company.entity";

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Company, (company) => company.stacks)
  @JoinTable({
    name: "stacks",
    // inverseJoinColumn: [{ name: "skil_id" }],
  })
  used: Company[];
}
