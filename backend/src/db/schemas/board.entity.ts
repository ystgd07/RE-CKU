import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created: Date;
  @ManyToOne((type) => User, (user) => user.likeNotice) // 좋아하고있는 유저들
  likesFromUser: User[];
  @ManyToOne((type) => User, (user) => user.notices) // 누구의 게시물
  fromUser: User[];
}
