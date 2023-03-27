import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @Column({unique: true, nullable: false})
    nickname: string;
    @Column({nullable: false})
    password: string;

}