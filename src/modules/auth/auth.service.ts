import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  private async generateToken(user: any): Promise<string> {
    return await this.jwtService.signAsync(user);
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async comparePassword(enteredPassword: string, storedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const isPasswordMatch = await this.comparePassword(password, user.password);

      if (isPasswordMatch) {
        const { password, ...userValues } = user.dataValues;
        return userValues;
      }
    }
    return null;
  }

  async create(userDto: UserDto) {
    const hashedPassword = await this.hashPassword(userDto.password);
    const newUser = await this.userService.create({ ...userDto, password: hashedPassword });
    const { password, ...result } = newUser.dataValues;
    const token = await this.generateToken(result);
    return { access_token: token };
  }

  async login(user: any) {
    const token = await this.generateToken(user);
    return {
      access_token: token,
    };
  }
}
