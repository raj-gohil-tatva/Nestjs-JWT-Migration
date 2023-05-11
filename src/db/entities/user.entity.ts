import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    unique: true,
    update: false,
    comment: 'Email is the unique and only created but not updated.',
  })
  Email: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Password: string;
}
