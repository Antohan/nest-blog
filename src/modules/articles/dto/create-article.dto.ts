import { IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString({ message: 'Заголовок должен быть строкой' })
  @MinLength(1, {
    message: 'Заголовок должен быть длиннее или равен $constraint1 символу',
  })
  title: string;

  @IsString({ message: 'Крнтент должен быть строкой' })
  @MinLength(1, { message: 'Cодержимое должно быть больше или равно $constraint1 символу' })
  content: string;
}
