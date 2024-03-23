import { TrainersRepository } from "src/repositories/trainers-repository";
import { PokemonsRepository } from "src/repositories/pokemons-repository";
import { TeamRepository } from "src/repositories/team-repository";
import { Pokemon, Team, Trainer } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetTeamPokemonUseCaseRequest {
  trainerId: string;
}

interface GetTeamPokemonUseCaseResponse {
  trainer: Trainer;
  pokemons: Pokemon[];
  team: Team;
}

export class GetTeamPokemonUseCase {
  constructor(
    private trainerRepository: TrainersRepository,
    private pokemonRepository: PokemonsRepository,
    private teamRepository: TeamRepository,
  ) {}

  async execute({
    trainerId,
  }: GetTeamPokemonUseCaseRequest): Promise<GetTeamPokemonUseCaseResponse> {
    const trainer = await this.trainerRepository.findById(trainerId);
    const pokemons = await this.pokemonRepository.getTeamPokemons(trainerId);
    const team = await this.teamRepository.getTeam(trainerId);

    if (!trainer) {
      throw new ResourceNotFoundError();
    }

    if (!pokemons) {
      throw new ResourceNotFoundError();
    }

    return {
      trainer,
      pokemons,
      team,
    };
  }
}
