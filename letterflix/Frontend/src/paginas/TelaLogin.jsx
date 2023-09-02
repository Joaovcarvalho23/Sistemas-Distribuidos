import React, { useState } from 'react';
import Navbar from '../componentes/Navbar';
import axios from 'axios';

const TelaLogin = () => {
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
  try {
    const response = await axios.post('http://127.0.0.1:8000/accounts/login/', formData);
    if (response.data.success) {
      // Login bem-sucedido, redirecionar ou exibir uma mensagem de sucesso
      console.log(response.data.message);
    } else {
      // Login falhou, tratar erros
      console.error(response.data.errors);
    }
  } catch (error) {
    // Lidar com erros de rede ou outras exceções
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
      </form>
    </div>
  );
};

export default TelaLogin;
