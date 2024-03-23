import { FastifyRequest, FastifyReply } from "fastify";
import { makeGetTeamPokemonUseCase } from "src/use-cases/factories/make-get-team-pokemon-use-case";

export async function getTeam(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getTeamPokemon = makeGetTeamPokemonUseCase();

  const { trainer, pokemons, team } = await getTeamPokemon.execute({
    trainerId: request.user.sub,
  });

  return reply.status(200).send({
    trainer: trainer.username,
    pokemons: pokemons.map((pokemon) => ({
      pokemon_name: pokemon.pokemon_name,
    })),
    team: team.name,
  });
}
