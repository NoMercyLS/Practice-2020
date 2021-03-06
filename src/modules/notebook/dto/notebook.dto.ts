import { IsDate, IsDefined, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotebookDto {
  @ApiProperty({description: 'User first name', type: String})
  @IsString({ message: 'Not a string', each: false })
  firstName: string;
  @ApiProperty({description: 'User last name', type: String})
  @IsString({ message: 'Not a string', each: false })
  lastName: string;
  @ApiProperty({description: 'User phone number', type: String})
  @IsPhoneNumber('ru', { message: 'Not a phone number', each: false })
  phoneNumber: string;
  @ApiProperty({description: 'Description', type: String})
  @IsString({ message: 'Not a string', each: false })
  description: string;
  @ApiProperty({description: 'Date', type: Date})
  @IsDefined({ message: 'Not a date', each: false })
  date: Date;
}

export class NotebookResponseDto extends NotebookDto {
  @ApiProperty({description: 'UserID', type: Number})
  @IsNumber( { allowInfinity: false, allowNaN: false }, { message: 'Not a number' })
  id: number;
}