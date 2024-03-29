import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vote } from '../votes/votes.entity';

@Entity()
export class Petition {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "description", type: "varchar" })
    description: string;

    @CreateDateColumn()
    createdDate: Date;

    @OneToMany(() => Vote, vote => vote.petition, {
        cascade: ["remove"],
    })
    votes: Vote[];
}
