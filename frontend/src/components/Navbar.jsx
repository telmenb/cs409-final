import React, { useContext } from 'react';
import {
  Button, Grid, Link, Container, Typography,
} from '@mui/material';
import { UserContext } from '../contexts/UserContext';

function Navbar() {
  const { username, dispatch } = useContext(UserContext);

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
          <Link href="/" underline="none">
            Home
          </Link>
        </Grid>
        <Grid item>
          <Link href="/carousel" underline="none">
            Learn
          </Link>
        </Grid>
        <Grid item>
          <Link href="/quiz" underline="none">
            Quiz
          </Link>
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
          }}
        >
          Hello,&nbsp;
          {username}
          !
        </Typography>
        <Button
          sx={{ textTransform: 'none', marginLeft: '10px' }}
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
