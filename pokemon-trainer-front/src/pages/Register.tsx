import { z } from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useState } from 'react';

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

type FormData = {
  username: string;
  password: string;
};

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
          const response = await axios.post("http://192.168.0.101:3333/trainers", {
            username: data.username,
            password: data.password
          });
            response.data;
            window.location.href = '/';
          setError(null);
        } catch (error) {
            setError('Erro ao criar usuário. Por favor, tente novamente.');
        }
      };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container component="main" maxWidth="xs" style={{ backgroundColor: '#cfcfcf', padding: '40px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(241, 0, 0, 0.1)' }}>
            <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '20px', color: '#1a1919', fontWeight: 'bold' }}>
            Login
            </Typography>
            {error && <Typography variant="body2" color="error" align="center" style={{ marginBottom: '10px' }}>{error}</Typography>}
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    {...register('username')}
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    {...register('password')}
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ marginTop: '20px', bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' } }}
            >
                Criar Usuário
            </Button>
            </form>
        </Container>
    </div>
  );
}
