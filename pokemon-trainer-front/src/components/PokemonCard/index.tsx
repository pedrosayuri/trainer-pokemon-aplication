import axios, { AxiosError } from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CircularProgress, Snackbar } from '@mui/material';
import { useState } from "react";
import { Pokemon } from '../../interfaces/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  teamNameExists: boolean | false;
}

export default function PokemonCard({ pokemon, teamNameExists }: PokemonCardProps) {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_APP_API_URL;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [evolutions, setEvolutions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [openEvolutions, setOpenEvolutions] = useState<boolean>(true);

  const handleAddPokemonToTeam = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${apiUrl}/team/addpokemons`, {
        pokemonName: pokemon.name,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setErrorMessage(null);
      setSuccessMessage('Pokémon adicionado ao time com sucesso!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao adicionar pokemon ao time:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          setErrorMessage("O time já está cheio.");
        } else {
          setErrorMessage('Erro ao adicionar o Pokémon ao time. Por favor, tente novamente.');
        }
      }
      setOpenSnackbar(true);
    }
  }

  const handleViewMore = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/pokemon/listByNameAndTypesWithEvolutions`, {
        name: pokemon.name
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setErrorMessage(null);
      setSuccessMessage(null);
      setOpenSnackbar(false);
      setEvolutions(response.data[0].evolutions);
      setOpenEvolutions(false);

    } catch (error) {
      console.error("Erro ao buscar evoluções do pokemon:", error);
      setErrorMessage("Erro ao buscar evoluções do pokemon. Por favor, tente novamente.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  }

  const handleStopSeeEvolutions = () => {
    setEvolutions([]);
    setOpenEvolutions(true);
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  }

  return (
    <Card 
      sx={{ 
        maxWidth: 300,
        transition: 'transform 0.1s ease-in-out',
        transform: hovered ? 'scale(1) translateY(-15px)' : 'scale(1)',
        backgroundColor: hovered ? '#00a3a3': 'white',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardMedia
        sx={{ height: 300 }}
        image={pokemon.image}
        title={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Type:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" align="right">
              {pokemon.types.map((type) => type.type_name).join(" and ")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Weight:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" align="right">
              {(pokemon.weight / 10).toFixed(1)} kg
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Height:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" align="right">
              {(pokemon.height / 10).toFixed(1)} m
            </Typography>
          </Grid>
        </Grid>
        {teamNameExists && !errorMessage && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleAddPokemonToTeam}>
              Adicionar no time (Máx. 5)
            </Button>
          </div>
        )}
        {openEvolutions && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" color="primary" onClick={handleViewMore}>
            Ver evoluções
          </Button>
        </div>
        )}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <CircularProgress />
          </div>
        )}
        {evolutions.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <Typography align="center">
              {evolutions.map((evolution, index) => (
                <div key={index}>{index+1} º Evolução - {evolution}</div>
              ))}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                  <Button variant="contained" color="error" onClick={handleStopSeeEvolutions}>
                    Ver Menos
                  </Button>
                </div>
            </Typography>
          </div>
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={errorMessage || successMessage || ''}
        />
      </CardContent>
    </Card>
  );
}
