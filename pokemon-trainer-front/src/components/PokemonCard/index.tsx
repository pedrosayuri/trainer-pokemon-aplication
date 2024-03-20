import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Pokemon } from '../../interfaces/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const capitalizedPokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const formattedWeight = `${(pokemon.weight / 10).toFixed(1)} kg`;
  const formattedHeight = `${(pokemon.height / 10).toFixed(1)} m`; 

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={pokemon.image}
        title={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {capitalizedPokemonName}
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
              {formattedWeight}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Height:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" align="right">
              {formattedHeight}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
