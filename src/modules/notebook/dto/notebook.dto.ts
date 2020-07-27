import { IsDate, IsDefined, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class NotebookDto {
  @IsString({ message: 'Not a string\n', each: false })
  firstName: string;
  @IsString({ message: 'Not a string\n', each: false })
  lastName: string;
  @IsPhoneNumber('ru', { message: 'Not a phone number\n', each: false })
  phoneNumber: string;
  @IsString({ message: 'Not a string\n', each: false })
  description: string;
  @IsDefined({ message: 'Not a date\n', each: false })
  date: Date;
}

export class NotebookResponseDto extends NotebookDto {
  @IsNumber( { allowInfinity: false, allowNaN: false }, { message: 'Not a number\n' })
  id: number;
}