import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navigation from 'components/Navigation/Navbar';
import Navbar from 'components/Navigation/BottomBar';
import HomePage from 'components/HomePage/HomePage';
import Favourites from 'components/Favourites/Favourites';
import Register from 'components/Register/Register';
import Login from 'components/Login/Login';
import Newsletter from 'components/Newsletter/Newsletter';
import NotFoundPage from 'components/NotFoundPage/NotFoundPage';

function App(): JSX.Element {
  return (
    <Fragment>
      <Navigation />
      <Navbar />
      <Newsletter />
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/favourite'>
          <Favourites />
        </Route>
        <Route path='*'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
