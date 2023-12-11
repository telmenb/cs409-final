import { React, useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from './Modal';

function FlashCard(props) {
  const {
    frontText, backText, imageUrl,
  } = props;
  const [openModal, setOpenModal] = useState(false);

  return (
    <Card
      sx={{
        padding: '0px 50px',
        height: '600px',
        textAlign: 'start',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardActionArea>
        <CardContent onClick={() => setOpenModal(true)}>
          { imageUrl && (
            <CardMedia
              component="img"
              image={imageUrl}
              height={frontText ? 600 - 24 * frontText.split(/\n/).length : 600}
              sx={{ objectFit: 'contain' }}
            />
          )}
          { frontText && (
            <Typography sx={{ whiteSpace: 'pre-line' }}>
                {frontText}
            </Typography>
          )}
        </CardContent>
        <Modal
          open={openModal}
          setOpen={setOpenModal}
          text={backText}
        />
      </CardActionArea>
    </Card>
  );
}

export default FlashCard;
