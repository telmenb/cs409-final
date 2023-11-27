import React, { useState } from 'react';
import {
  TextField, Button, Paper, Typography, Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h3" style={{ marginTop: '20px' }}>GeoQuizzr</Typography>
        <Typography variant="h5" style={{ alignSelf: 'start', marginTop: '35px', marginLeft: '5px' }}>Sign in</Typography>
        <form style={{ width: '100%' }}>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: '20px', borderRadius: '30px' }}
          >
            Sign in
          </Button>
        </form>
        <Typography sx={{ marginTop: '10px' }}>
          New here? &nbsp;
          <Link to="/register">Join now</Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
