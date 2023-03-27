import { User } from 'entities/User';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: "user_id"})
    user_id: number;
    @Column({
        nullable: false
    })
    post_text: string;
    @Column({
        nullable: true
    })
    post_photo_url: string; 

    access_token: string;
}

export { User };
