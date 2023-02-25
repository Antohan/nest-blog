import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

const Gender = {
  male: 'male',
  female: 'female',
} as const;

export class UserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: string;
}
