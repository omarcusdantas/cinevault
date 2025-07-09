import { Entity, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Actor } from "../../actors/entities/actor.entity";
import { Rating } from "../../ratings/entities/rating.entity";
import { BaseEntity } from "../../shared/entities/base.entity";

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
