import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';

const MainRoutes = () => {

  return (
    <Switch> 
      <Route exact path='/' render={() => <Home/>}></Route>
			{/* <Route exact path='/projects' render={(props) => <Home {...props} />}></Route> */}
		</Switch>
  );
}

export default MainRoutes;