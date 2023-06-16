import React, { useState} from 'react';
import TeamProfile from './teamProfile';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ReviewPage from './ReviewPage';
import { useReviewContext } from '../../Hooks/useReviewContext';
import Badge from '@mui/material/Badge';

import TeamPage from './TeamsPage/TeamPage';


export default function Home() {
  const [searchTab, setSearchTab] = useState(0);
  const { reviewPlayers} = useReviewContext();

  

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 999,
          backgroundColor:'rgb(104, 124, 158)'
        }}
      >
       <BottomNavigation
  style={{ backgroundColor: 'rgb(104, 124, 158)' }}
  showLabels
  value={searchTab}
  onChange={(event, newValue) => {
    setSearchTab(newValue);
  }}
>
{/* {`Front Office Review ${
      reviewPlayers.length > 0 ? `(${reviewPlayers.length})` : ''
    }`} */}
  <BottomNavigationAction
    style={{ color: searchTab === 0 ? 'white' : 'black'}}
    label={<Badge color="secondary" badgeContent={reviewPlayers.length > 0 ? `${reviewPlayers.length}` : '0'}>
      <div style={{padding:'0.35rem',}}>
      Front Office Review</div></Badge>}
  />
  <BottomNavigationAction
    style={{ color: searchTab === 1 ? 'white' : 'black' }}
    label="Player Database"
  />
  <BottomNavigationAction
    style={{ color: searchTab === 2 ? 'white' : 'black' }} 
    label="Teams"
  />
</BottomNavigation>

      </div>
      <div style={{ paddingTop: '56px' }}>
       
        {searchTab === 0 && <ReviewPage />}
        {searchTab === 1 && <TeamProfile />}
        {searchTab === 2 && <TeamPage
            setSearchTabState={setSearchTab}
        />} {/* Render the third page */}
      </div>
    </>
  );
}
