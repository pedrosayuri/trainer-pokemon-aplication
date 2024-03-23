import { create } from "./create";
import { FastifyInstance } from "fastify";
import { verifyJWT } from "src/http/middlewares/verify-jwt";
import { getTeam } from "./get-team";

export async function pokemonTeamRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/team/addpokemons", create);

  app.get("/team/getpokemons", getTeam);
}
