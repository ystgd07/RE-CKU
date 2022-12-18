import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class PointFromComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.getPointFromComment)
<<<<<<< HEAD
  user: User;

  @ManyToOne((type) => Comment, (comment) => comment.getPoint)
  comment: Comment;
=======
  userId: User;

  @ManyToOne((type) => Comment, (comment) => comment.getPoint)
  commentId: Comment;
>>>>>>> 942e880d7c1ee1ca1a10e1cac56fa4191f54f969
}
