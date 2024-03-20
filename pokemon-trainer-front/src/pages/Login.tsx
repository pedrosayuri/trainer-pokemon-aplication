import { z } from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

type FormData = {
  username: string;
  password: string;
};

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
          const response = await axios.post("http://192.168.0.101:3333/sessions", {
            username: data.username,
            password: data.password
          });
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/home');
          setError(null);
        } catch (error) {
          setError('Erro ao fazer login. Por favor, tente novamente.');
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
                Login
            </Button>
            <Typography variant="body1" align="center" style={{ marginTop: '20px', color: '#000000' }}>
                    Ainda não tem uma conta?{' '}
                    <Link to="/register" style={{ textDecoration: 'underline', color: '#115293' }}>
                        Criar usuário
                    </Link>
                </Typography>
            </form>
        </Container>
    </div>
  );
}
