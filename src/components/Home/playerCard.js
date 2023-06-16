import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActions } from '@mui/material';
import { useReviewContext } from "../../Hooks/useReviewContext";
import { RiDeleteBin6Line } from "react-icons/ri"
import axios from 'axios';
import MoreInfo from './misc/MoreInfo.js';
import scrollToTop from '../../helper/helper';
import BasicPopover from './misc/Popover';


const PlayerCard = ({ player }) => {
  const { reviewPlayers, dispatch } = useReviewContext();

  var color = '';
  if (player.unit === 1) {
    color = ''
  } else if (player.unit === 2) {
    color = ''
  }

  if (player.injury === "out") {
    color = "rgb(191, 193, 199)"
  }

  function convertToFeetInches(inches) {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches}"`;
  }
  const formattedHeight = convertToFeetInches(player.height);

  function addToReview(player) {
    const res = reviewPlayers.some((item => item.nbaId === player.nbaId))
    if (res === false) {
      dispatch({ type: "ADD_REVIEWS", payload: player });

      // Send a POST request to add the player to the under review list
      axios.post('https://mavs-backend.onrender.com/underReview/addPlayer', { player: player })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  function removeFromReview(player) {
    dispatch({ type: "REMOVE_REVIEWS", payload: player });

    // Send a DELETE request to remove the player from the under review list
    axios.delete(`https://mavs-backend.onrender.com/underReview/removePlayer/${player.nbaId}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const formatNumber = (number) => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
    const formattedNumber = (number / Math.pow(10, suffixIndex * 3)).toFixed(2);
    return `$${formattedNumber} ${suffixes[suffixIndex]}`;
  };

  return (
    <Card elevation={5} sx={{ maxWidth: 250 }} style={{ backgroundColor: color }} className="player-card">
      <CardMedia
        component="img"
        height="150"
        image={player.photoUrl}
        alt="Player"
      />
      <CardContent>
        <Typography variant="h7" component="div">
          {player.firstName + ' ' + player.lastName}
          {player.unit === 1 && <span className="unit-indicator" style={{ backgroundColor: 'rgb(255, 8, 8)' }}></span>}
          {player.unit === 2 && <span className="unit-indicator" style={{ backgroundColor: 'rgb(17, 5, 250)' }}></span>}
          {player.unit > 2 && player.injury !== 'out' && <span className="unit-indicator" style={{ backgroundColor: 'white' }}></span>}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {player.team}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {player.position} - {formattedHeight} - Age: {Math.floor(player.age)}
        </Typography>
        <Grid container spacing={1} style={{ marginTop: '0.5rem' }}>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              PPG
            </Typography>
            <Typography variant="body2" color="text.primary">
              {player.ppg}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              AST
            </Typography>
            <Typography variant="body2" color="text.primary">
              {player.ast}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              REB
            </Typography>
            <Typography variant="body2" color="text.primary">
              {player.reb}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              FG%
            </Typography>
            <Typography variant="body2" color="text.primary">
              {player.fgPercentage}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              MP
            </Typography>
            <Typography variant="body2" color="text.primary">
              {player.mp}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" color="text.secondary">
              TOV
            </Typography>
            <Typography variant="body2" color="text.primary">
              {player.tov}
            </Typography>
          </Grid>
          <MoreInfo player={player} />
        </Grid>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: '0.5rem' }}>
          <div>{player.capTotal ? formatNumber(player.capTotal) : 'check player details'}</div>
          <BasicPopover
            ContractTotal={player.capTotal}
            Agent={player.agent}
          />
        </div>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small"  color="primary" component={Link} to={`/player/${player.nbaId}`} onClick={scrollToTop}>
         Player Details
        </Button>
        {!reviewPlayers.some((item => item.nbaId === player.nbaId)) ? (
          <Button variant='contained' size='small' onClick={() => { addToReview(player) }}>
            Add to Review
          </Button>
        ) : (
            <Button startIcon={<RiDeleteBin6Line />} size='small' onClick={() => { removeFromReview(player) }}>
              Remove
            </Button>
          )}
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
