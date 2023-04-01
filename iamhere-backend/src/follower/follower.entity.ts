import { User } from 'entities/User';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Follower{
    @PrimaryColumn()
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "follower_id"})
    follower_id: number;
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "user_id"})
    user_id: number;

    access_token: string;
}

export { User };