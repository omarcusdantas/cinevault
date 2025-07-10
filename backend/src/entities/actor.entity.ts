import { Entity, Column, ManyToMany } from "typeorm";
import { Movie } from "./movie.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Actor extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
