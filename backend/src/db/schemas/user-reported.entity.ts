import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./user.entity";

export enum reportReasonEnum {
  isSensational = "선정적인 게시글/댓글 포스팅",
  isSlang = "비속어 사용자",
  isPapering = "도배꾼",
  basic = "그냥 신고하고싶음",
}
@Entity()
export class UserReportTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @ManyToOne((type) => User, (user) => user.reported)
  reporterUser: User;

  @ManyToOne((type) => User)
  defendantUser: User;
}
