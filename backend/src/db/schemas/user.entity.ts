import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Resume} from "./resume.entity";

export enum roleEnum {
    COMPANY = "기업",
    USER = "개인",
    ADMIN = "관리자"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    password: string;

    @Column({ type: "enum", enum: roleEnum })
    role: roleEnum;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column()
    active: boolean;

    @OneToMany((type) => Resume, (resume) => resume.resume_id, { nullable: true })
    //@OneToMany((type) => Topic, (resume) => resume.owner, { nullable: true })
    resume_id: Resume[];
}





//   @Column()
//   username: roleEnum;

//   @Column({ type: "enum", enum: roleEnum })
//   role: string;

//   //   @OneToMany((type) => Topic, (topic) => topic.owner, { eager: false })
//   @OneToMany((type) => Topic, (resume) => resume.owner, { nullable: true })
//   ownResume: Resume[];
// }
