import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { TeamContext } from '../context/TeamContext';
import { useState, useContext, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

interface TeamData {
    trainer: string;
    pokemons: Pokemon[];
    team: string;
    message?: string;
}

interface Pokemon {
    pokemon_name: string;
}

export function Team() {
    const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_APP_API_URL;

    const navigate = useNavigate();

    const [teamNameInput, setTeamNameInput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { setTeamNameExists } = useContext(TeamContext);
    const [teamData, setTeamData] = useState<TeamData | null>(null);

    const getTeamData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<TeamData>(`${apiUrl}/team/getpokemons`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTeamData(response.data.message === "Team not found" ? null : response.data);
        } catch (error) {
            console.log('Erro ao buscar dados da equipe:', error);
        }
    };

    const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeamNameInput(event.target.value);
    };

    const handleSaveTeam = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`${apiUrl}/team`, { teamName: teamNameInput }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setTeamNameInput(response.data.name);
            setTeamNameExists(true, response.data.name);
            navigate('/home');
            setError(null);
        } catch (error) {
            console.error('Erro ao salvar a equipe:', error);
            setError('Erro ao salvar a equipe. Por favor, tente novamente.');
        }
    };

    useEffect(() => {
        getTeamData();
    }, []);

    return (
        <div>
            <Navbar page="Home" />
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Container component="main" maxWidth="xs" style={{ backgroundColor: '#cfcfcf', padding: '40px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(241, 0, 0, 0.1)' }}>
                    {error && <Typography variant="body2" color="error" align="center" style={{ marginBottom: '10px' }}>{error}</Typography>}
                    {teamData ? (
                        <>
                            <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '20px', color: '#1a1919', fontWeight: 'bold' }}>
                                Dados da Equipe
                            </Typography>
                            <Typography variant="body1" align="center" style={{ marginBottom: '10px', color: '#1a1919', }}>
                                Treinador: {teamData?.trainer}
                            </Typography>
                            <Typography variant="body1" align="center" style={{ marginBottom: '10px', color: '#1a1919', }}>
                                Nome do Time: {teamData?.team}
                            </Typography>
                            <Typography variant="body1" align="center" style={{ marginBottom: '10px', color: '#1a1919', }}>
                                Sua equipe possui {teamData?.pokemons.length} Pokémon(s):
                            </Typography>
                            {teamData?.pokemons.map((pokemon: Pokemon, index: number) => (
                                <Typography variant="body1" align="center" key={index} style={{ color: '#1a1919'}}>
                                    {pokemon.pokemon_name}
                                </Typography>
                            ))}
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </Container>
            </div>
        </div>
    );
}
