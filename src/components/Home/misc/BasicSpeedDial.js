import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useReviewContext } from '../../../Hooks/useReviewContext';




export default function BasicSpeedDial() {
  const { reviewPlayers, dispatch } = useReviewContext();

  function HighToLow(lstPlayers) {
    dispatch({type: 'SET_REVIEWS', payload: lstPlayers.sort((a, b) => b.capTotal - a.capTotal)}) ;
  }

  function LowToHigh(lstPlayers) {
    dispatch({type: 'SET_REVIEWS', payload: lstPlayers.sort((a, b) => a.capTotal - b.capTotal)}) ;
  }

  function LowToHighAge(lstPlayers) {
    dispatch({type: 'SET_REVIEWS', payload: lstPlayers.sort((a, b) => a.age - b.age)}) ;
  }


  const actions = [
    { icon: "Salary", name: 'Descending', command: HighToLow },
    { icon: "Salary", name: 'Ascending', command: LowToHigh },
    { icon: "Age", name: 'Ascending', command: LowToHighAge },
  ]; 

  return (
    <Box sx={{ height: 320, position: 'fixed', bottom: 16, right: 16, zIndex: 10 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic "
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=>action.command(reviewPlayers)}
          />
        ))}
      </SpeedDial>
      Sort By
    </Box>
  );
}
