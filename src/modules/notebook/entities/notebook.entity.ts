import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class NotebookEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 } )
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 14 })
  phoneNumber: string;

  @Column({ type: 'text'})
  description: string;

  @Column({ type: 'varchar', length: 50 })
  date: string;
}