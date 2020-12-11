import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { FavouriteProvider } from 'shared/stores/favourite.store';
import { UserProvider } from 'shared/stores/user.store';

const app = (
  <StrictMode>
    <CookiesProvider>
      <UserProvider>
        <Router>
          <FavouriteProvider>
            <App />
          </FavouriteProvider>
        </Router>
      </UserProvider>
    </CookiesProvider>
  </StrictMode>
);
const root = document.getElementById('root');

render(app, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
