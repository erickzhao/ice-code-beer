import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { PATRICK: null };

    fetch('/api/PATRICK')
      .then(p => {
        return p.json();
      })
      .then(p => {
        this.setState({
          PATRICK: p
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    console.log(this.state);
    const { PATRICK } = this.state;
    const PATRICK2 = PATRICK && PATRICK.map(p => (
      <p className="App-intro">
        {JSON.stringify(p)}
      </p>
    ))
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PATRICK</h1>
        </header>
        { PATRICK2 }
      </div>
    );
  }
}

export default App;
