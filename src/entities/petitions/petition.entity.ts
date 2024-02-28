import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vote } from '../votes/votes.entity';

@Entity()
export class Petition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column({ default: 0 })
    voteCount: number;


    @OneToMany(() => Vote, vote => vote.petition)
    votes: Vote[];
}
