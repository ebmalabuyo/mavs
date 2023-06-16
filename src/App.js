import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './components/Home/Home';
import PlayerProfile from './components/PlayerProfile/playerProfile';


function App() {
  const history = createBrowserHistory();

  const routes = [
    { path: '/', element: 
    <Home />},
    { path: '/player/:id', element: <PlayerProfile /> },
    {path: '/teamSalaries/:id', element: <div>Salaries Page</div>}
  ];

  const router = createBrowserRouter(routes, history);

  return (
    <div>
    <RouterProvider router={router}>
    </RouterProvider>
    </div>

  );
}

export default App;
