import React, { useState } from 'react';
import Navbar from '../componentes/Navbar';
import axios from 'axios';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TelaLogin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
  
    if (!formData.username || !formData.password) {
      console.error("Preencha todos os campos.");
      return;
    }
  
    try {
      await axios.post('http://127.0.0.1:8000/accounts/login/', formData).then((response) => {
        navigate('/menu')
      });
    } catch (error) {
      console.error(error);
    }
  };  

  return (
    <div>
      <Navbar />
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
        <Box sx={{ cursor: "pointer"}} onClick={() => navigate ("/cadastrar")}> Cadastre-se agora! </Box>
      </form>
    </div>
  );
};

export default TelaLogin;
