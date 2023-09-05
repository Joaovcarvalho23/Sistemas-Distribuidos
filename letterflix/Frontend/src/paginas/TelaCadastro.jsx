import React, { useState } from 'react';
import axios from 'axios';
import { Container, CssBaseline, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TelaCadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.age) {
      console.error('Preencha todos os campos.');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/accounts/signup/', formData).then((response) => {
        navigate('/');
        console.log(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      sx={{
        backgroundImage: 'url("/assets/fotoCinema.jpg")', // Adicione o caminho da sua imagem de fundo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Altura mínima da tela inteira
        padding: '2rem',
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <img
          src="/assets/LetterFlixLogo.png"
          alt="Logo" // Adicione um alt para acessibilidade
          style={{ width: '420px', height: '200px', marginBottom: '1rem' }} // Largura e altura personalizadas
        />
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', color: 'white' }}>
          Bem-vindo(a) ao LetterFlix! O aplicativo com os filmes que estão bombando hoje nos cinemas!
        </Typography>
        <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Crie seu usuário"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            sx={{ backgroundColor: 'white' }} // Fundo branco
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Crie sua senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ backgroundColor: 'white' }} // Fundo branco
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Informe sua idade"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            sx={{ backgroundColor: 'white' }} // Fundo branco
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Cadastrar
          </Button>
        </form>
      </Container>
    </Paper>
  );
};

export default TelaCadastro;
