import * as React from 'react';
import {Box, Grid, Typography, Button} from '@mui/material/';
import ClickAwayListener from '@mui/base/ClickAwayListener';

export default function MoreInfo({player}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles = {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    bgcolor: 'background.paper',
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <Button type="button" onClick={handleClick}>
          Additonal Stats
        </Button>
        {open ? (
          <Box sx={styles}>
            <Grid container spacing={1}>
            <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              GP
            </Typography>
            <Typography variant="body2" color="text.primary">
              {player.gp}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              GS
            </Typography>
            <Typography variant="body2" color="text.primary">
            {player.gs}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              FT%
            </Typography>
            <Typography variant="body2" color="text.primary">
            {player.ftp}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              FGA
            </Typography>
            <Typography variant="body2" color="text.primary">
            {player.fga}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              PF
            </Typography>
            <Typography variant="body2" color="text.primary">
            {player.pf}
            </Typography>
          </Grid>
            </Grid>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}