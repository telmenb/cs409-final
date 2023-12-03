import React from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Home() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Grid container spacing={5} sx={{ marginTop: '-30px' }}>
        <Grid item xs={4}>
          <Typography
            sx={{
              textAlign: 'center',
              marginTop: '10px',
              fontFamily: 'Optima, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '2px',
              color: 'navy',
            }}
            variant="h3"
          >
            GeoQuizzr
          </Typography>
          <Box
            component="img"
            sx={{
              height: 250,
              width: 250,
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png"
          />
        </Grid>
        <Grid item xs={8} style={{ marginTop: '10px' }}>
          <Typography
            sx={{
              textAlign: 'left',
              maxWidth: '700px',
              fontSize: '25px',
              lineHeight: '50px',
              color: 'darkgreen',
              fontStyle: 'italic',
            }}
            variant="paragraph"
          >
            Welcome to GeoQuizzr, the ultimate destination for
            geography enthusiasts and trivia aficionados!
            Embark on a journey across continents,
            countries, and cultures as you test your knowledge
            of the world&apos;s diverse landscapes, capitals,
            landmarks, and much more. GeoQuizzr offers
            questions designed to challenge and educate.
          </Typography>
        </Grid>
      </Grid>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '100px',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={[
            {
              maxWidth: '350px',
              height: '350px',
              borderRadius: '20px',
              marginTop: '75px',
              borderColor: 'blue',
              borderWidth: '1px',
              borderStyle: 'solid',
            },
            {
              '&:hover': {
                boxShadow: '15px 15px 28px 1px rgba(0, 0, 0, 0.35)',
                cursor: 'pointer',
              },
            },
          ]}
          onClick={() => navigate('/carousel')}
        >
          <CardMedia
            sx={{ height: 175 }}
            image="https://lovetoteach87.com/wp-content/uploads/2020/09/flashcards-1591812_1280-940x590.jpg"
          />
          <CardContent>
            <IconButton>
              <PlayCircleIcon sx={{
                height: 50,
                width: 50,
                marginTop: '-60px',
                color: 'black',
              }}
              />
            </IconButton>
            <Typography sx={{ fontStyle: 'italic' }} gutterBottom variant="h5" component="div">
              Learn/Flashcards
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn new geography knowledge through flashcards!
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={[
            {
              maxWidth: '350px',
              height: '350px',
              borderRadius: '20px',
              marginTop: '75px',
              borderColor: 'blue',
              borderWidth: '1px',
              borderStyle: 'solid',
            },
            {
              '&:hover': {
                boxShadow: '15px 15px 28px 1px rgba(0, 0, 0, 0.35)',
                cursor: 'pointer',
              },
            },
          ]}
          onClick={() => navigate('/quiz')}
        >
          <CardMedia
            sx={{ height: 175 }}
            image="https://img.freepik.com/premium-vector/examination-result-grade-paper-pencil-isolated-dark-background-vector-illustration-test_547674-578.jpg"
          />
          <CardContent>
            <IconButton>
              <PlayCircleIcon sx={{
                height: 50,
                width: 50,
                marginTop: '-60px',
                color: 'black',
              }}
              />
            </IconButton>
            <Typography sx={{ fontStyle: 'italic' }} gutterBottom variant="h5" component="div">
              Review/Quiz
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Test your geography mastery with this quiz, and review your answers after!
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Home;
