import { ApiProperty } from "@nestjs/swagger";

export class ExceptionDto {
  @ApiProperty({
    default: 404
  })
  statusCode: number;
  @ApiProperty({
    default: 'Record not found! Try another ID'
  })
  message: string;
  @ApiProperty({
    default: 'Not Found'
  })
  error: string;
}