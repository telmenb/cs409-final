import { React, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from './Modal';
import decodeHtml from '../../services/decodeHtml';

function FlashCard(props) {
  const { card } = props;
  const [openModal, setOpenModal] = useState(false);
  const [frontText, setFrontText] = useState('');

  useEffect(() => {
    const choices = [card.correct_answer].concat(card.incorrect_answers)
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    let text;
    if (choices.length === 4) {
      text = `${card.question}\na. ${choices[0]}\nb. ${choices[1]}\nc. ${choices[2]}\nd. ${choices[3]}`;
    } else {
      text = `${card.question}\na. ${choices[0]}\nb. ${choices[1]}`;
    }
    setFrontText(decodeHtml(text));
  }, [card.question]);

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
          { card.imageUrl && (
            <CardMedia
              component="img"
              image={card.imageUrl}
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
          text={decodeHtml(card.correct_answer)}
        />
      </CardActionArea>
    </Card>
  );
}

export default FlashCard;
