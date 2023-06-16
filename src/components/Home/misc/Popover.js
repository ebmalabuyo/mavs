import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {GrCircleInformation} from "react-icons/gr"

export default function BasicPopover({ContractTotal, Agent}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Typography aria-describedby={id} variant="contained" onClick={handleClick}>
        <GrCircleInformation/>
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{fontSize:"0.75rem"} }>see player details for contract breakdown</Typography>
      </Popover>
    </div>
  );
}