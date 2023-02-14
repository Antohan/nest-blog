import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, pasword: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pasword) {
      return {
        id: user.id,
        username: user.username,
      };
    }
    return null;
  }
}
