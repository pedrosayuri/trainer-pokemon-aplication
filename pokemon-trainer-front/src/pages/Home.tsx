import { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { Pokemon } from '../interfaces/Pokemon';
import PokemonCard from '../components/PokemonCard';
import { TeamContext } from '../context/TeamContext';
import axios from 'axios';
import Navbar from '../components/Navbar';

export function Home() {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_APP_API_URL;

  const { teamNameExists } = useContext(TeamContext);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutFunction, setTimeoutFunction] = useState<number>(0);

  console.log(searchTerm)

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
      setError("Não foi possível carregar os Pokémon. Tente novamente mais tarde.");
      setLoading(false);
    }
  };


  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (term === "") {
        window.location.reload();
        return;
      }
      setTimeoutFunction(setTimeout(() => {
        setError("A pesquisa está demorando. Tente novamente ou atualize a página.");
        setLoading(false);
      }, 5000))

      const response = await axios.post(`${apiUrl}/pokemon/listByNameAndTypes`, {
        name: term
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      clearTimeout(timeoutFunction);
      setPokemons(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError("Não foi encontrado nenhum Pokémon com o nome inserido.");
      clearTimeout(timeoutFunction);
      getPokemons();
      setPokemons([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div>
      <Navbar page="Team" isSearch handleSearch={handleSearch}/>
      <Container maxWidth="xl">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography variant="h6" color="error" align="center" style={{ marginTop: "2rem" }}>
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {pokemons.map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id} sx={{ display: 'flex', justifyContent: 'center' }}>
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
