export class CreateNotebookDto {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
  date: Date;
}

export  class UpdateNotebookDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  description: string;
  date: Date;
}