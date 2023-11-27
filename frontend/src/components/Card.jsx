import { React, useState } from 'react';
import PropTypes from 'prop-types';
import MUICard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Modal from './Modal';

// Card component that takes in name, description, and image as properties
function Card(props) {
  const { name, description, image } = props;
  const [openModal, setOpenModal] = useState(false);

  return (
    <MUICard>
      <CardActionArea>
        <CardContent>
          <CardMedia
            component="img"
            image={image}
            onClick={() => setOpenModal(true)}
          />
          <Modal
            open={openModal}
            setOpen={setOpenModal}
            name={name}
            description={description}
          />
        </CardContent>
      </CardActionArea>
    </MUICard>
  );
}

// Defines proptypes for card component, ensuring correct data types are passed to CardComponent
Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
