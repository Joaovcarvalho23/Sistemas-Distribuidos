import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, CssBaseline, Typography, TextField, Button, Paper, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
  });

  const [showPopOver, setShowPopOver] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/accounts/edit_profile/')
      .then((response) => {
        const { username, email, age } = response.data;
        setFormData({ username, email, age });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/accounts/edit_profile/', formData);
      setShowPopOver(true);

      setTimeout(() => {
        setShowPopOver(false);
        navigate('/menu');
      }, 2500);
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
          Editar Perfil
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
            label="Email"
            name="email"
            value={formData.email}
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
            Salvar Alterações
          </Button>
        </form>
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
            Perfil atualizado com sucesso!
          </Box>
        </Popover>
      </Container>
    </Paper>
  );
};

export default EditarPerfil;