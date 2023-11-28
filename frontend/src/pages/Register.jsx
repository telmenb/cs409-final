import React, { useState } from 'react';
import {
  TextField, Button, Paper, Typography, Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);
  const [confirmation, setConfirmation] = useState(undefined);

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      setError(undefined);
      setConfirmation('User successfully created');
    } else {
      const errorMessage = await response.text();
      setConfirmation(undefined);
      setError(errorMessage);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography
        variant="h3"
        style={{ marginTop: '100px', textAlign: 'center' }}
      >
        GeoQuizzr
      </Typography>
      <Typography
        variant="h5"
        style={{ marginTop: '20px', textAlign: 'center' }}
      >
        Let&apos;s get your geo game up
      </Typography>
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          borderRadius: '10px',
        }}
      >
        <form style={{ width: '100%', textAlign: 'center' }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          { error && (
            <Typography
              variant="subtitle1"
              color="red"
              style={{ marginTop: '10px' }}
            >
              {error}
            </Typography>
          )}
          { confirmation && (
            <Typography
              variant="subtitle1"
              color="green"
              style={{ marginTop: '10px' }}
            >
              {confirmation}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            style={{ marginTop: '20px', borderRadius: '30px' }}
          >
            Register
          </Button>
        </form>
        <Typography sx={{ marginTop: '10px' }}>
          Already registered? &nbsp;
          <Link to="/login">Sign in</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Register;
