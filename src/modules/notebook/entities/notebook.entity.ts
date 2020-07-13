import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotebookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  date: string;
}