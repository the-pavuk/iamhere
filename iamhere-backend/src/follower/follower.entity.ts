import { User } from 'entities/User';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Follower{
    @PrimaryGeneratedColumn()
    follow_id: number;
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "follower_id"})
    follower_id: number;
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "user_id"})
    user_id: number;

    access_token: string;
}

export { User };