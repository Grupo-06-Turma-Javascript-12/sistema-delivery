import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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
