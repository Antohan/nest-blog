import { Injectable } from '@nestjs/common';

import type User from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      username: 'anton',
      password: 'password',
    },
    {
      id: '2',
      username: 'mary',
      password: 'password',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
