import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {IndexPage} from './IndexPage';
import {AthletePage} from './AthletePage';
import {NotFoundPage} from './NotFoundPage';
import athletes from '../data/athletes';

const renderIndex = () => <IndexPage athletes={athletes}/>;
const renderAthlete = ({match, staticContext}) => {
  const id = match.params.id;
  const athlete = athletes.find(current => current.id === id);
  if (!athlete) {
    return <NotFoundPage staticContext={staticContext}/>;
  }

  return <AthletePage athlete={athlete} athletes={athletes}/>;
};

export const App = () => (
  <Switch>
    <Route exact path="/" component={renderIndex}/>
    <Route exact path="/athlete/:id" component={renderAthlete}/>
    <Route component={NotFoundPage}/>
  </Switch>
);

export default App;
