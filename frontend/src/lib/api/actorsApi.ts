import "server-only";

import "dotenv/config";
import axios from "axios";
import { Actor } from "../interfaces/actor/Actor";
import { ActorWithRelations } from "../interfaces/actor/ActorWithRelations";

const api = axios.create({
  baseURL: process.env.API_URL,
});

export async function fetchActors(search?: string, page: number = 1) {
  const response = await api.get("/v1/actors", {
    params: { title: search, page, limit: 6 },
  });

  const totalPages = Math.ceil(response.data.total / 6);

  return {
    data: response.data.data as Actor[],
    totalPages,
    currentPage: response.data.page,
  };
}

export async function fetchActorById(id: number) {
  const response = await api.get(`/v1/actors/${id}`);
  return response.data as ActorWithRelations;
}
