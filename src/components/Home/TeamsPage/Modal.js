import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import { TiDeleteOutline } from 'react-icons/ti';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  p: 4,
};

export default function BasicModal({ team, data, setSearchTabState }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log(team.id);
  };
  const handleClose = () => setOpen(false);

  const buttonStyle = {
    width: '100%',
    height: '100%',
  };

  const handleHover = (event) => {
    event.currentTarget.style.transform = 'scale(1.1)';
  };

  const handleHoverEnd = (event) => {
    event.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div>
      <Button
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverEnd}
        style={buttonStyle}
        onClick={handleOpen}
      >
        {team.teamLogo}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              Team: {data ? data.team : 'Unavailable'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Button onClick={() => setSearchTabState(1)}>Search Roster</Button>
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Upcoming Free Agents:
            </Typography>
            {data && data.upcoming ? (
              data.upcoming.map((each) => (
                <Typography key={each.name} variant="body2">
                  {each.name}
                </Typography>
              ))
            ) : (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Data Unavailable
              </Typography>
            )}
          </div>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="h2">
                Offense Stats
              </Typography>
              <Typography variant="body2">
                <b>Offensive Rating:</b> {data ? data['OFF RTG'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Offensive Rating Rank:</b> {data ? data['OFF RTG RANK'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Effective Field Goal %:</b> {data ? data.EfgPercentage : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>EFG% Rank:</b> {data ? data['EfgPercentage RANK'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Free Throws Attempted:</b> {data ? data.FTA : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>FTA Rank:</b> {data ? data['FTA RANK'] : 'Unavailable'}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="h2">
                Defense Stats
              </Typography>
              <Typography variant="body2">
                <b>Defensive Rating:</b> {data ? data['DEF RTG'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Defensive Rating Rank:</b> {data ? data['DEF RTG RANK'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Opponent EFG%:</b> {data ? data['OPP EfgPercentage'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Opponent EFG% Rank:</b> {data ? data['OPP EfgPercentage RANK'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Turnovers Forced:</b> {data ? data['TURNOVERS FORCED'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Turnovers Forced Rank:</b> {data ? data['TURNOVERS FORCED RANK'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>Free Throws Allowed:</b> {data ? data['FTA ALLOWED'] : 'Unavailable'}
              </Typography>
              <Typography variant="body2">
                <b>FTA Allowed Rank:</b> {data ? data['FTA ALLOWED RANK'] : 'Unavailable'}
              </Typography>
            </Grid>
          </Grid>
          <Button onClick={handleClose}>
            <TiDeleteOutline size={35} />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
