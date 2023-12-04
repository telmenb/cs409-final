import { React, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from './Modal';

function FlashCard(props) {
  const {
    frontText, backText, imgSrc,
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
          { imgSrc && (
            <CardMedia
              component="img"
              image={imgSrc}
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

FlashCard.propTypes = {
  frontText: PropTypes.string.isRequired,
  backText: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default FlashCard;
