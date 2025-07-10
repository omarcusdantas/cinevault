import { Entity, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Actor } from "./actor.entity";
import { Rating } from "./rating.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Movie extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Actor, (actor) => actor.movies, { cascade: true })
  @JoinTable()
  actors: Actor[];

  @OneToMany(() => Rating, (rating) => rating.movie, { cascade: true })
  ratings: Rating[];
}
