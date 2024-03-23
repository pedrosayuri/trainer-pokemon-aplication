import { Prisma, Pokemon } from "@prisma/client";

export interface PokemonsRepository {
  findById(id: string): Promise<Pokemon | null>;
  getTeamPokemons(trainerId: string): Promise<Pokemon[]>;
  create(data: Prisma.PokemonUncheckedCreateInput): Promise<Pokemon>;
}
