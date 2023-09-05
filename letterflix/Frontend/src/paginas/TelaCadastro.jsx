import React, { useState } from 'react';
import axios from 'axios';
import { Box, Container, CssBaseline, Typography, TextField, Button, Paper, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TelaCadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
  });

  const [showPopOver, setShowPopOver] = useState(false); // Estado para controlar a exibição do PopOver

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
        setShowPopOver(true); 
        setTimeout(() => {
          setShowPopOver(false); 
          navigate('/'); 
        }, 2500); 
        console.log(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper
      sx={{
        backgroundImage: 'url("/assets/fotoCinema.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <img
          src="/assets/LetterFlixLogo.png"
          alt="Logo"
          style={{ width: '420px', height: '200px', marginBottom: '1rem' }}
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
            label="Usuário"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ backgroundColor: 'white' }}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Idade"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            sx={{ backgroundColor: 'white' }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Cadastrar
          </Button>
        </form>
        {/* PopOver para exibir a mensagem */}
        <Popover
          open={showPopOver}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box p={2} bgcolor="primary.main" color="white">
            Usuário cadastrado com sucesso!
          </Box>
        </Popover>
      </Container>
    </Paper>
  );
};

export default TelaCadastro;
