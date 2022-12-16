import { Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class PointFromComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany((type) => User, (user) => user.getPointFromComment)
  userId: User;

  @ManyToMany((type) => Comment, (comment) => comment.getPoint)
  commentId: Comment;
}
