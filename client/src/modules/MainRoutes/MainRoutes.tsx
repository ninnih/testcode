import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';

interface Props {
	socket: any
}

const MainRoutes: FC<Props> = ({socket}) => {

  return (
    <Switch> 
      <Route exact path='/' render={() => <Home socket={socket}/>}></Route>
		</Switch>
  );
}

export default MainRoutes;