import { PrismaTrainersRepository } from "src/repositories/prisma/prisma-trainers-repository";
import { PrismaPokemonsRepository } from "src/repositories/prisma/prisma-pokemons-repository";
import { PrismaTeamRepository } from "src/repositories/prisma/prisma-teams-repository";
import { GetTeamPokemonUseCase } from "../get-team-pokemon";

export function makeGetTeamPokemonUseCase() {
  const trainersRepository = new PrismaTrainersRepository();
  const pokemonsRepository = new PrismaPokemonsRepository();
  const teamRepository = new PrismaTeamRepository();
  const useCase = new GetTeamPokemonUseCase(
    trainersRepository,
    pokemonsRepository,
    teamRepository,
  );

  return useCase;
}
