import React, { useState } from 'react';

const PlayerFilterForm = ({ teams, onFilter }) => {
  const [formState, setFormState] = useState({
    selectedTeam: 'MIA',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { selectedTeam } = formState;
    const team = selectedTeam || '';
    onFilter(team);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex',  alignItems: 'flex-start' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <label htmlFor="team-select" style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
          Team:
        </label>
        <select
          id="team-select"
          name="selectedTeam"
          value={formState.selectedTeam}
          onChange={handleInputChange}
          style={{ padding: '0.5rem', fontSize: '1rem', border: '1px solid #2b87f0', borderRadius: '4px' }}
        >
          <option value="">All</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#2b87f0',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default PlayerFilterForm;
