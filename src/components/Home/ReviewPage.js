import React, {useEffect }from 'react';
import { useReviewContext } from '../../Hooks/useReviewContext';
import PlayerCard from './playerCard';
import Typography from '@mui/material/Typography';
import Key from './misc/Key';
import BasicSpeedDial from './misc/BasicSpeedDial';
import axios from "axios"


export default function ReviewPage() {
  const { reviewPlayers, dispatch } = useReviewContext();

  useEffect(() => {
    const getUnderReviewPlayers = async () => {
      try {
        const response = await axios.get('https://mavs-backend.onrender.com/underReview');
        const data = response.data;

        if (response.status === 200) {
          dispatch({ type: 'SET_REVIEWS', payload: data.playerUnderReview });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUnderReviewPlayers();
  }, [dispatch]);



  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center',padding: '2rem', paddingBottom: '8rem' }}>
      {reviewPlayers.length > 0 ? (
        <div className='cards'>
          {reviewPlayers && reviewPlayers.map((each, indx) => {
            return <PlayerCard key={indx} player={each} />;
          })}
        </div>
      ) : (
        <Typography style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "20vh" }} variant='h5'>No Players Currently Under Review</Typography>
      )}
      <Key/>
      <BasicSpeedDial
      />
    </div>
  );
}
