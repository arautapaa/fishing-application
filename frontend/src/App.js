import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EntryPageProvider from './components/add/EntryPageProvider';
import DraughtListPageProvider from './components/draughts/DraughtListPageProvider';
import UserGroupPageProvider from './components/usergroups/UserGroupPageProvider';
import Header from './components/common/Header';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {

    return (
      <div className="application">
        <Header />
        <Switch>
          <Route exact path='/' component={DraughtListPageProvider}/>
          <Route path='/add' component={EntryPageProvider}/>
          <Route path='/groups' component={UserGroupPageProvider} />
        </Switch>
            
      </div>
    );
  }
}

export default App;
