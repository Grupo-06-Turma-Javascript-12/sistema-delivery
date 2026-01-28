import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from './../../usuario/entities/usuario.entity';

@Entity({ name: 'db_delivery' })
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'smallint', nullable: false })
  tempo_preparo: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  tipo: string;

  @ApiProperty({ type: () => categiria })
  @ManyToOne(() => categiria, (categiria) => categiria.produto, {
    onDelete: 'CASCADE',
  })
  categiria: Categoria;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (Usuario) => usuario.produto, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}