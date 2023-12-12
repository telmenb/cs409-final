import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function LinkCard(props) {
  const {
    imageUrl, route, title, description, setDifficulty,
  } = props;
  const navigate = useNavigate();
  function handleClick() {
    if (route) {
      navigate(route);
    } else {
      let difficulty;
      if (title === 'Beginner') {
        difficulty = 'easy';
      } else if (title === 'Intermediate') {
        difficulty = 'medium';
      } else {
        difficulty = 'hard';
      }
      setDifficulty(difficulty);
    }
  }

  return (
    <Card
      sx={[
        {
          width: '350px',
          height: '350px',
          borderRadius: '20px',
          marginTop: '45px',
        },
        {
          '&:hover': {
            boxShadow: '15px 15px 28px 1px rgba(0, 0, 0, 0.35)',
            cursor: 'pointer',
          },
        },
      ]}
      onClick={() => handleClick()}
    >
      <CardMedia
        sx={{ height: 175 }}
        image={imageUrl}
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
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LinkCard;
