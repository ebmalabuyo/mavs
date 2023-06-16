import React from 'react';
import Paper from '@mui/material/Paper';

export default function Key() {
  return (
    <Paper
      elevation={3}
      style={{
        position: 'fixed',
        bottom: '0.5rem',
        left: '0.5rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.1rem',
        backgroundColor: 'rgb(104, 124, 158)',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '1px solid black',
            backgroundColor: 'rgb(255, 8, 8)',
            marginRight: '8px',
          }}
        ></div>
        <span style={{ fontWeight: 'bold' }}>1st Unit</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '1px solid black',
            backgroundColor: 'rgb(17, 5, 250)',
            marginRight: '8px',
          }}
        ></div>
        <span style={{ fontWeight: 'bold' }}>2nd Unit</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '1px solid black',
            backgroundColor: 'white',
            marginRight: '8px',
          }}
        ></div>
        <span style={{ fontWeight: 'bold' }}>Reserve</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            border: '1px solid black',
            backgroundColor: 'rgb(160, 162, 168)',
            marginRight: '8px',
          }}
        ></div>
        <span style={{ fontWeight: 'bold' }}>Injury</span>
      </div>
    </Paper>
  );
}
