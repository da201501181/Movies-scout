import * as React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Error from './components/Error/Error';

import Header from './components/Header/Header';
import ShowMovie from './components/ShowMovie/ShowMovie';
import SearchMovie from './container/SearchMovie/SearchMovie';


class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          
          
          <Route path="/" exact={true} component={Header} />
          <Switch>
          <Route path="/" exact={true} component={SearchMovie} />
          <Route path="/details" component = {ShowMovie} />
          <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
