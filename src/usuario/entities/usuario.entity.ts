import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_usuario' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  @Column({ length: 5000 })
  foto: string;

  @OneToMany(() => Produto, (produto) => produto.usuario)
  produto: Produto[];
}
