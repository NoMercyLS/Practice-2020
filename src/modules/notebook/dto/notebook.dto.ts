export class NotebookDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
  date: Date;
}

export class NotebookResponseDto extends NotebookDto {
  id: number;
}