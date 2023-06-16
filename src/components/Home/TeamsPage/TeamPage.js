import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import teams from './listLogos';
import BasicModal from './Modal';

export default function TeamPage({setSearchTabState}) {
  const [nbateamsData, setNbaTeamsData] = useState([]);

  const gridItemStyle = {
    transition: 'transform 0.3s ease-in-out',
    position: 'relative', // Added to make the position of text relative to grid item
  };

  const rankTextStyle = {
    position: 'absolute',
    top: 5,
    right: 5,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '2px 4px',
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 4,
  };

  const labelContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Added to align the texts on the left and right side
    alignItems: 'center',
    marginBottom: 12,
  };

  const labelTextStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  };

  const standingBoxStyle = {
    display: 'inline-block',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '2px 4px',
    borderRadius: 4,
  };

  const standingTextStyle = {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  };

  useEffect(() => {
    function getNbaTeamsInfo() {
      try {
        axios
          .get('https://mavs-backend.onrender.com/nbaTeamsData')
          .then((response) => {
            const teamData = response.data;
            setNbaTeamsData(teamData);
            
          })
          .catch((error) => {
            console.log('Error retrieving data:', error);
          });
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    }
    getNbaTeamsInfo();
  }, []);

  return (
    <Container maxWidth="md" sx={{ p: 1}}>
      <div style={labelContainerStyle}>
        <div>
          <Typography variant="body1" style={labelTextStyle}>
            NBA Team Summaries
          </Typography>
        </div>
        <div>
          <div style={standingBoxStyle}>
            <Typography variant="body1" style={standingTextStyle}>
              Standing
            </Typography>
          </div>
        </div>
      </div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {teams.map((team) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            key={team.id}
            style={gridItemStyle}
          >
            <Typography variant="body2" style={rankTextStyle}>
              {team.rank}
            </Typography>
            <BasicModal
              setSearchTabState={setSearchTabState}
              team={team}
              data={nbateamsData.find((item) => item?.team === team.id)}
            ></BasicModal>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
