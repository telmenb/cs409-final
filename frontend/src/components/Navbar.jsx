import React from 'react';
import { Grid, Link } from '@mui/material';

function Navbar() {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        minWidth: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10px',
      }}
    >
      <Grid item>
        <Link href="/" underline="none">
          Home
        </Link>
      </Grid>
      <Grid item>
        <Link href="/carousel" underline="none">
          Carousel
        </Link>
      </Grid>
    </Grid>
  );
}

export default Navbar;
