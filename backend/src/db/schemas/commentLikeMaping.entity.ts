import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";
@Entity()
export class CommentLikeMaping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.likesResume)
  user: User;

  @ManyToOne((type) => Comment, (comment) => comment.ownLikes)
  comment: Comment;
}
