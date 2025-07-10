import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { Movie } from "../entities/movie.entity";
import { Actor } from "../entities/actor.entity";
import { Rating } from "../entities/rating.entity";
import { User } from "../entities/user.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Movie, Actor, Rating, User],
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  migrations: ["src/database/migrations/**/*.ts"],
});
