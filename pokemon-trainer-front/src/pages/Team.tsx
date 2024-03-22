import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { TeamContext } from '../context/TeamContext';
import { SetStateAction, useState, useContext } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

export function Team() {
    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_APP_API_URL;

    const navigate = useNavigate();

    const [teamNameInput, setTeamName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { setTeamNameExists } = useContext(TeamContext);

    const handleTeamNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTeamName(event.target.value);
    };

    const handleSaveTeam = async () => {
        try {
            const token = localStorage.getItem('token');

            console.log('Token:', token);

            if (token) {
                const tokenPayload = token.split('.')[1];
                const decodedPayload = atob(tokenPayload);
                const { sub } = JSON.parse(decodedPayload);
            
                console.log('ID do usuário:', sub);
            } else {
                console.log('Token não encontrado no localStorage.');
            }

            const response = await axios.post(`${apiUrl}/team`, { teamName: teamNameInput }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            console.log(response.data);
            setTeamName(response.data.name);
            setTeamNameExists(true, response.data.name);
            navigate('/home');
        
            setError(null);
        } catch (error) {
            setError('Erro ao salvar a equipe. Por favor, tente novamente.');
        }
    };

    return (
        <div>
            <Navbar page="Home" />
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container component="main" maxWidth="xs" style={{ backgroundColor: '#cfcfcf', padding: '40px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(241, 0, 0, 0.1)' }}>
                    {error && <Typography variant="body2" color="error" align="center" style={{ marginBottom: '10px' }}>{error}</Typography>}
                    <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '20px', color: '#1a1919', fontWeight: 'bold' }}>
                        Nome de Equipe
                    </Typography>
                    <TextField
                        label="Digite o nome da Equipe"
                        variant="outlined"
                        fullWidth
                        value={teamNameInput}
                        onChange={handleTeamNameChange}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSaveTeam}
                    >
                        Salvar
                    </Button>
                </Container>
            </div>
        </div>
    );
}
