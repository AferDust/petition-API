import {
    Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserCreateDto } from "./dto/user.create.dto";
import { User } from "./users.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createdDate: UserCreateDto): Promise<User> {
        const { password, login } = createdDate;

        console.log(`Password: ${password}`);
        const newUser = this.userRepository.create({
            login: login,
            password: password
        });

        console.log(`New User: ${newUser}`);
        return await this.userRepository.save(newUser);
    }

    async findOneByLogin(login: string): Promise<User> {
        const instance: User = await this.userRepository.findOne({
            where: { login: login }
        });

        return instance
    }
}
