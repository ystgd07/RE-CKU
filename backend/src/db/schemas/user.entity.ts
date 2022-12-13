// import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

// export enum roleEnum {
//   COMPANY = "기업",
//   USER = "개인",
//   ADMIN = "관리자",
// }
// @Entity()
// export class Company {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
//   created: Date;

//   @Column()
//   username: roleEnum;

//   @Column({ type: "enum", enum: roleEnum })
//   role: string;

//   @Column()
//   email: string;

//   @Column()
//   phoneNumber: string;
//   //   @OneToMany((type) => Topic, (topic) => topic.owner, { eager: false })
//   @OneToMany((type) => Topic, (resume) => resume.owner, { nullable: true })
//   ownResume: Resume[];
// }
