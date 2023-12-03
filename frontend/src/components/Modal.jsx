import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiModal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

function Modal(props) {
  const {
    open, setOpen, text,
  } = props;

  return (
    <div>
      <MuiModal
        open={open}
        onClose={() => { setOpen(false); }}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
        </Box>
      </MuiModal>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Modal;
