import { Container, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "../interfaces/Pokemon";

export function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getPokemons = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://192.168.0.101:3333/pokemon/listAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPokemons(response.data);
    } catch (error) {
      setError("Não foi encontrado nenhum Pokémon na pokédex com o nome inserido.");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      getPokemons();  
    } else {
      setSearchPokemon(event.target.value);
    }   
  };

  const pokemonFilter = async (searchPokemon: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://192.168.0.101:3333/pokemon/listByNameAndTypes", {
        name: searchPokemon
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setPokemons(response.data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar pokemons:", error);
      setError("Não foi encontrado nenhum Pokémon na pokédex com o nome inserido.");
      setPokemons([]);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    pokemonFilter(searchPokemon);
  }, [searchPokemon]);

  return (
    <div>
      <Navbar handleSearchChange={handleSearchChange} page="Team" isSearch/>
      <Container maxWidth="xl">
        {error && pokemons.length === 0 ? (
          <Typography variant="h6" color="error" align="center" style={{ marginTop: "2rem" }}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {pokemons.map((pokemon) => (
              <Grid item xs={3} key={pokemon.id}>
                <PokemonCard
                  pokemon={pokemon}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
}
