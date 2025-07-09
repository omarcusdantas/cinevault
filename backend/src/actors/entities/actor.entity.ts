import { Entity, Column, ManyToMany } from "typeorm";
import { Movie } from "../../movies/entities/movie.entity";
import { BaseEntity } from "../../shared/entities/base.entity";

@Entity()
export class Actor extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
