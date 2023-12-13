import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Grid, Container, Typography,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';

function Navbar() {
  const { username, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <Container
      sx={{
        display: 'flex',
        width: '100%',
        marginTop: '20px',
        justifyContent: 'space-between',
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Grid item>
          <Typography
            sx={{
              margin: 0,
              color: '#1976d2',
              textDecoration: 'none',
              font: 'inherit',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Home
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{
              margin: 0,
              color: '#1976d2',
              textDecoration: 'none',
              font: 'inherit',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/learn')}
          >
            Learn
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            sx={{
              margin: 0,
              color: '#1976d2',
              textDecoration: 'none',
              font: 'inherit',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/quiz')}
          >
            Quiz
          </Typography>
        </Grid>
      </Grid>
      <Container
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <Typography
          variant="paragraph"
          sx={{
            marginBottom: 0,
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'inherit',
          }}
        >
          Hello,&nbsp;
          {username}
          !
        </Typography>
        <Button
          sx={{ textTransform: 'none', marginLeft: '10px', fontFamily: 'inherit' }}
          variant="text"
          size="large"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Container>
    </Container>
  );
}

export default Navbar;
