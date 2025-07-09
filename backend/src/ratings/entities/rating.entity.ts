import { Entity, Column, ManyToOne } from "typeorm";
import { Movie } from "../../movies/entities/movie.entity";
import { BaseEntity } from "../../shared/entities/base.entity";

@Entity()
export class Rating extends BaseEntity {
  @Column("int")
  value: number;

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => Movie, (movie) => movie.ratings, { onDelete: "CASCADE" })
  movie: Movie;
}
