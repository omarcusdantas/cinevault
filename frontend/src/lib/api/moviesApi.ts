import "server-only";

import "dotenv/config";
import axios from "axios";
import { Movie } from "../interfaces/movie/Movie";
import { MovieWithRelations } from "../interfaces/movie/MovieWithRelations";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export async function fetchMovies(search?: string, page: number = 1) {
  const response = await api.get("/v1/movies", {
    params: { title: search, page, limit: 6 },
  });

  const totalPages = Math.ceil(response.data.total / 6);

  return {
    data: response.data.data as Movie[],
    totalPages,
    currentPage: response.data.page,
  };
}

export async function fetchMovieById(id: number) {
  const response = await api.get(`/v1/movies/${id}`);
  return response.data as MovieWithRelations;
}
