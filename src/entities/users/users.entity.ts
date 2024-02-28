import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vote } from '../votes/votes.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;


    @OneToMany(() => Vote, vote => vote.user)
    votes: Vote[];
}
