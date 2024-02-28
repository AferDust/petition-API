import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Petition } from '../petitions/petition.entity';
import { User } from "../users/users.entity";

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.votes)
    user: User;

    @ManyToOne(() => Petition, petition => petition.votes)
    petition: Petition;

    @CreateDateColumn()
    dateTime: Date;
}
