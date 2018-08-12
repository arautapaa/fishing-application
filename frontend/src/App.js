import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EntryPageProvider from './components/add/EntryPageProvider';
import DraughtListPageProvider from './components/draughts/DraughtListPageProvider';
import UserGroupPageProvider from './components/usergroups/UserGroupPageProvider';
import UserGroupInvitePageProvider from './components/usergroups/UserGroupInvitePageProvider';
import UserInvitationAcceptProvider from './components/userinvitation/UserInvitationAcceptProvider';
import UserGroupPlacePageProvider from './components/usergroups/UserGroupPlacePageProvider';
import Header from './components/common/Header';
import { Switch, Route } from 'react-router-dom';
import DraughtPageProvider from './components/draughts/DraughtPageProvider';

class App extends Component {
  render() {

    return (
      <div className="application">
        <Header />
        <Switch>
          <Route exact path='/' component={DraughtListPageProvider}/>
          <Route path='/add' component={EntryPageProvider}/>
          <Route exact path='/groups' component={UserGroupPageProvider} />
          <Route path='/groups/invite' component={UserGroupInvitePageProvider} />
          <Route path='/invitation/:id' component={UserInvitationAcceptProvider} />
          <Route path='/groups/places' component={UserGroupPlacePageProvider} />
          <Route path='/draughts/:id' component={DraughtPageProvider} />
        </Switch>
            
      </div>
    );
  }
}

export default App;
