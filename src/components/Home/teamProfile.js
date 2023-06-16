import React from 'react';
import { useState, useEffect } from 'react';
import PlayerFilterForm from '../FilterForm/PlayerFilterForm';
import PlayerCard from './playerCard';
import { nbaPositions, nbaTeams, units } from '../FilterForm/filterdata';
import Key from './misc/Key';
import axios from 'axios';
import { useFilteredListContext } from '../../Hooks/useFilteredListContext';
import { useSearchedListContext } from '../../Hooks/useSearchedListContext';
import { useLocation } from 'react-router-dom'

export default function TeamProfile() {
  const [formState, setFormState] = useState({
    selectedPosition: '',
    searchValue: ''
  });

  const { filteredPlayers, dispatch: dispatchFilter } = useFilteredListContext();
  const { searchedPlayers, dispatch: dispatchSearch } = useSearchedListContext();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]) // helper with scrolling issue upon leaving route

  const getData = async (team, search) => {
    try {
      const response = await axios.get(`https://mavs-backend.onrender.com/teamPlayers/${team}`);
      const players = response.data;
      
      dispatchSearch({ type: 'SET_SEARCHED_LISTS', payload: players });
      dispatchFilter({ type: 'SET_FILTERED_LISTS', payload: players });
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const filtered = (pos, search) => {
    let lst;
    if (pos === '') {
      lst = searchedPlayers.filter((each) => {
        const name = each.firstName.toLowerCase() + ' ' + each.lastName.toLowerCase();
        const searchValue = search.toLowerCase();
        return name.startsWith(searchValue);
      });
    } else {
      lst = searchedPlayers.filter((each) => each.position === pos);
      if (search !== '') {
        lst = lst.filter((each) => {
          const name = each.firstName.toLowerCase() + ' ' + each.lastName.toLowerCase();
          const searchValue = search.toLowerCase();
          return name.startsWith(searchValue);
        });
      }
    }
    dispatchFilter({ type: 'SET_FILTERED_LISTS', payload: lst });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'selectedPosition') {
      filtered(value, formState.searchValue);
    } else if (name === 'searchValue') {
      filtered(formState.selectedPosition, value);
    }
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', paddingBottom: '8rem' }}>
      <PlayerFilterForm teams={nbaTeams} positions={nbaPositions} units={units} onFilter={getData} />

      <hr></hr>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems:"center" }}>
        <p>Filter Results</p>
        <div>
          <label htmlFor="position-select" style={{ marginBottom: '0.25rem', color: '#888', fontSize: '0.8rem' }}>
            Position:
          </label>
          <select
            id="position-select"
            name="selectedPosition"
            value={formState.selectedPosition}
            onChange={handleInputChange}
            style={{ minWidth: 100, marginBottom: '0.25rem', borderRadius: '4px', padding: '0.3rem', border: '1px solid #888' }}
          >
            <option value="">All</option>
            {nbaPositions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-input" style={{ marginBottom: '0.5rem', color: '#888', fontSize: '0.8rem' }}>
            Search:
          </label>
          <input
            id="search-input"
            type="text"
            name="searchValue"
            value={formState.searchValue}
            onChange={handleInputChange}
            style={{ minWidth: 80, marginBottom: '0.5rem', borderRadius: '4px', padding: '0.3rem', border: '1px solid #888' }}
          />
        </div>
      </div>

      <div className="cards">
        {filteredPlayers &&
          filteredPlayers.map((each, indx) => (
            <PlayerCard key={indx} player={each} />
          ))}
      </div>
      <Key />
    </div>
  );
}
