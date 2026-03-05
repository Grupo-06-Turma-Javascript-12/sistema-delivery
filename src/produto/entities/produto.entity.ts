import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from './../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Column({
    type: 'decimal',
    precision: 19,
    scale: 4,
    transformer: {
      from: (value: string) => parseFloat(value),
      to: (value: number) => value,
    },
  })
  preco: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'smallint', nullable: false })
  tempo_preparo: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  tipo: string;

  aplicarDesconto(percentual: number): void {
    if (percentual <= 0 || percentual >= 100) {
      throw new Error('Percentual de desconto inválido');
    }

    const desconto = Number(this.preco) * (percentual / 100);
    this.preco = Number((Number(this.preco) - desconto).toFixed(2));
  }

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
