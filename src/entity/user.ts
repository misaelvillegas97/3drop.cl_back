import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Length, IsEmail } from 'class-validator';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80, comment: 'Nombre del usuario' })
  @Length(10, 80)
  name: string;

  @Column({ length: 100, comment: 'Correo del usuario' })
  @Length(10, 100)
  @IsEmail()
  email: string;

  @Column({
    length: 100,
    nullable: false,
    comment: 'Contraseña del usuario encriptada',
  })
  @Length(10, 100)
  password: string;
}

export const userSchema = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true, example: 'Javier' },
  email: {
    type: 'string',
    required: true,
    example: 'avileslopez.javier@gmail.com',
  },
  password: { type: 'string', require: true, example: '********' },
};
