import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ReviewContextProvider } from './Context/ReviewContext';
import { FilteredListContextProvider } from './Context/FilterListContext';
import { SearchedListContextProvider } from './Context/SearchedListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReviewContextProvider>
      <SearchedListContextProvider>
      <FilteredListContextProvider>
          <App />
    </FilteredListContextProvider>
    </SearchedListContextProvider>
    </ReviewContextProvider>
  </React.StrictMode>
);

