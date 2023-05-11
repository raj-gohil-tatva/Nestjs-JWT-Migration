import { encryptPassword } from 'src/utilities/helper';
import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert } from 'typeorm';

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

  @Column({ select: false })
  Password: string;

  // Hook which will be called before the insert.
  @BeforeInsert()
  async encryptPassword() {
    // Encrypted the user entered password.
    console.info('Encrypting the user password...');
    this.Password = await encryptPassword(this.Password);
  }
}
