import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, TextField, Paper, Typography, Grid } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { MdDeleteForever } from 'react-icons/md';
import { useReviewContext } from '../../Hooks/useReviewContext';

const PlayerProfile = () => {
  const { reviewPlayers, dispatch } = useReviewContext();
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    scoutName: '',
    event: '',
    report: '',
  });

  function addToReview(player) {
    const res = reviewPlayers.some((item) => item.nbaId === player.nbaId);
    if (res === false) {
      axios
        .post('https://mavs-backend.onrender.com/underReview/addPlayer', { team: player.bio[0].currentTeam, playerId: player.bio[0].nbaId })
        .then((response) => {
          dispatch({ type: 'ADD_REVIEWS', payload: response.data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    const getPlayerData = async () => {
      try {
        const response = await axios.get(`https://mavs-backend.onrender.com/playerInfo/${id}`);
        const playerData = response.data;
        if (playerData) {
          setPlayer(playerData);
          setNotes(playerData.scoutingReports);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getPlayerData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmitScoutingReport = async (event) => {
    event.preventDefault();

    const { date, scoutName, event: eventValue, report } = formData;

    if (date && scoutName && eventValue && report) {
      const newScoutingReport = {
        date,
        scout: scoutName,
        event: eventValue,
        report,
      };

      try {
        await axios.post(`https://mavs-backend.onrender.com/playerInfo/${id}/addReport`, newScoutingReport);
      } catch (error) {
        console.error(error);
      }

      setNotes((prev) => [newScoutingReport, ...prev]);
      setFormData({
        date: '',
        scoutName: '',
        event: '',
        report: '',
      });

      console.log('Scouting report submitted');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleDeleteScoutingReport = async (noteID) => {
    try {
      await axios.delete(`https://mavs-backend.onrender.com/${id}/deleteReport/${noteID}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteID));
      console.log('Scouting report deleted');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div style={{ backgroundColor: '#F5F7FA', minHeight: '100vh', padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', backgroundColor: 'rgb(104, 124, 158)', padding: '1rem', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
        {player ? (
          <>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <Typography variant="h5" component="h2">
                    {player.bio[0].firstName} {player.bio[0].lastName}
                  </Typography>
                  <img className="profilepic" src={player.bio[0].photoUrl} alt="player" style={{ width: '200px', borderRadius: '50%' }} />
                  <Typography variant="subtitle1" component="h3">
                    Id: {id}
                  </Typography>
                  <Typography variant="body1">Team: {player.bio[0].currentTeam} | Pos: {player.bio[0].position}</Typography>
                  <Typography>Agent: {player.bio[0].agent}</Typography>
                  {!reviewPlayers.some((item) => item.nbaId === player.bio[0].nbaId) ? (
                    <Button size="small" variant="contained" onClick={() => addToReview(player)}>
                      Add to Review
                    </Button>
                  ) : (
                    <Typography variant="h6" style={{ color: 'blue' }}>
                      (UNDER FRONT OFFICE REVIEW)
                    </Typography>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', width: '100%' }}>
                    <div>
                      <Typography variant="h8" component="h3">
                        Current Contracts:
                      </Typography>
                      {player.contracts && player.contracts.length > 0 ? (
                        <div>
                          <Grid container spacing={1}>
                            {player.contracts.map((contract) => (
                              <Grid item xs={12} key={contract.id}>
                                <Typography variant="subtitle1" component="h2">
                                  <b>{contract.salaryYear} - {contract.salaryYear + 1}</b> : {contract.totalSalary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </Typography>
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      ) : (
                        <Typography variant="body1" component="div">
                          No contract
                        </Typography>
                      )}
                      
                    </div>
                    <div>
                      <div>
                        <Typography variant="subtitle2" component="h3">
                          Last Season Per Game Stats:
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" component="h3" style={{ fontWeight: 'bold' }}>
                              MP:
                            </Typography>
                            <Typography variant="subtitle2" component="h3">
                              {player.traditionalPerGame[0].MP}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" component="h3" style={{ fontWeight: 'bold' }}>
                              PTS:
                            </Typography>
                            <Typography variant="subtitle2" component="h3">
                              {player.traditionalPerGame[0].PTS}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" component="h3" style={{ fontWeight: 'bold' }}>
                              AST:
                            </Typography>
                            <Typography variant="subtitle2" component="h3">
                              {player.traditionalPerGame[0].AST}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" component="h3" style={{ fontWeight: 'bold' }}>
                              REB:
                            </Typography>
                            <Typography variant="subtitle2" component="h3">
                              {player.traditionalPerGame[0].TRB}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" component="h3" style={{ fontWeight: 'bold' }}>
                              STL:
                            </Typography>
                            <Typography variant="subtitle2" component="h3">
                              {player.traditionalPerGame[0].STL}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle2" component="h3" style={{ fontWeight: 'bold' }}>
                              FG%:
                            </Typography>
                            <Typography variant="subtitle2" component="h3">
                              {player.traditionalPerGame[0].FGp}%
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ p: 2 }} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="h3">
                    Add Scouting Report:
                  </Typography>
                  <form onSubmit={handleSubmitScoutingReport} style={{ maxWidth: '40rem' }}>
                    <div>
                      <TextField
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        type="text"
                        id="scoutName"
                        name="scoutName"
                        value={formData.scoutName}
                        onChange={handleInputChange}
                        label="Scout's Name"
                        required
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        type="text"
                        id="event"
                        name="event"
                        value={formData.event}
                        onChange={handleInputChange}
                        label="Event"
                        required
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                    <div>
                      <TextField
                        id="report"
                        name="report"
                        value={formData.report}
                        onChange={handleInputChange}
                        label="Report"
                        multiline
                        rows={4}
                        required
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                    <Button variant="contained" type="submit" fullWidth style={{ marginTop: '1rem' }}>
                      Submit
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>

            <div style={{ marginTop: '2rem', width: '100%' }}>
              <Typography variant='h5'>Scouting Reports</Typography>
              {notes.length > 0 ? (
                notes.map((item) => (
                  <Paper elevation={3} sx={{ p: 2 }} key={item.id} style={{ position: 'relative', marginBottom: '1rem' }} onClick={() => console.log(item.id)}>
                    <Typography variant="subtitle2" component="h2">
                      {item.event}: {formatDate(item.date)}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      {item.scout}
                    </Typography>
                    <Typography variant="body2" component="p" style={{ marginBottom: '0.5rem' }}>
                      {item.report}
                    </Typography>
                    <MdDeleteForever
                      onClick={() => handleDeleteScoutingReport(item.id)}
                      style={{ position: 'absolute', top: '5px', right: '5px', color: 'red', cursor: 'pointer' }}
                      size={30}
                    />
                  </Paper>
                ))
              ) : (
                <Typography variant="body1">No scouting reports available.</Typography>
              )}
            </div>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;
