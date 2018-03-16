import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      PATRICK: null,
      index: 0
    };
  }

  componentWillMount() {
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
    const increment = () => {
      if (this.state.PATRICK && this.state.index < this.state.PATRICK.length) {
        this.setState({
          index: this.state.index + 1
        })
      }
    }
    console.log(this.state);
    const { PATRICK, index } = this.state;
    const PATRICK2 = PATRICK && [PATRICK[index]].map(p => (
      <p className="App-intro">
        <img className="bar-image" src={p.image_url}/>
        <h1>{p.name}</h1>
        <p>{p.location.display_address.join(", ")}</p>
        <p>{p.price}</p>
        <p>Rating: {p.rating}</p>
        <p>Distance: {(p.distance/1000).toFixed(1)} km</p>
      </p>
    ))
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FIND BARS TO GO TO ON ST.PATRICK'S DAY</h1>
        </header>
        { PATRICK2 }
        <button onClick={increment}>Bunk off</button>
        <button onClick={increment}>Crack on</button>
      </div>
    );
  }
}

export default App;
