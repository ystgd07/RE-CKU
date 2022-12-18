import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class PointFromComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.getPointFromComment)
  user: User;

  @ManyToOne((type) => Comment, (comment) => comment.getPoint)
  comment: Comment;
}
