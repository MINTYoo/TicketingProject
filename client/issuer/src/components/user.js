import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { id });
      console.log(response.data);
    } catch (error) {
      setError('Invalid ID');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={handleIdChange}
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
