import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import LinkCard from '../LinkCard';

function SelectLevel(props) {
  const { setDifficulty } = props;
  return (
    <Container
      sx={{
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '40px',
      }}
    >
      <Typography
        sx={{ alignSelf: 'flex-start', fontFamily: 'inherit', color: '#1976d2' }}
        variant="h4"
      >
        Choose your level:
      </Typography>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '100px',
          justifyContent: 'center',
        }}
      >
        <LinkCard
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/6/66/World_Map_Grayscale.png"
          title="Beginner"
          description="Embark on your geographical journey with ease! Build your geography skills with our collection of beginner-friendly questions"
          setDifficulty={setDifficulty}
        />
        <LinkCard
          imageUrl="https://static.vecteezy.com/system/resources/previews/010/158/602/non_2x/world-map-background-grey-color-with-national-borders-free-vector.jpg"
          title="Intermediate"
          description="Ready to take your geography knowledge to the next level? Challenge yourself with our intermediate-level questions!"
          setDifficulty={setDifficulty}
        />
        <LinkCard
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/World_map_with_four_colours.svg/800px-World_map_with_four_colours.svg.png"
          title="Advanced"
          description="For the geography enthusiast seeking a true challenge, dive into our advanced-level questions"
          setDifficulty={setDifficulty}
        />
      </Box>
    </Container>
  );
}

export default SelectLevel;
