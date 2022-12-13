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

    @ManyToOne((type) => User, (user) => user.id )
    user_id: User[];
}
