import axios from "axios";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { Pokemon } from "../interfaces/Pokemon";
import PokemonCard from "../components/PokemonCard";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import { TeamContext } from "../context/TeamContext";

export function Home() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_APP_API_URL;

  const { teamNameExists } = useContext(TeamContext);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPokemons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/pokemon/listAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPokemons(response.data);
      setLoading(false);
    } catch (error) {
      setError("Não foi encontrado nenhum Pokémon na pokédex com o nome inserido.");
    }
  };

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    if (searchTerm === "") {
      getPokemons();
    } else {
      await pokemonFilter(searchTerm);
    }
  };

  const pokemonFilter = async (searchPokemon: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/pokemon/listByNameAndTypes`, {
        name: searchPokemon
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setPokemons(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar pokemons:", error);
      setError("Não foi encontrado nenhum Pokémon na pokédex com o nome inserido.");
      setPokemons([]);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <Navbar handleSearchChange={handleSearchChange} page="Team" isSearch/>
      <Container maxWidth="xl">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        ) : error && pokemons.length === 0 ? (
          <Typography variant="h6" color="error" align="center" style={{ marginTop: "2rem" }}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {pokemons.map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
                <PokemonCard
                  pokemon={pokemon}
                  teamNameExists={teamNameExists}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}
