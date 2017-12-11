import React, { Component } from 'react';
import './App.css';
import PlayerListing from './containers/PlayerListing'

class App extends Component {
  render() {
    return (
      <div className="App">
          <PlayerListing/>
      </div>
    );
  }
}

export default App;
