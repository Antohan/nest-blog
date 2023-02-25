import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(userDto: UserDto): Promise<User> {
    return await this.userModel.create<User>(userDto);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne<User>({ where: { email } });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findOne<User>({ where: { id } });
  }
}
