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
        <p>Price:</p>
        <form action="">
          <label for="$">$</label>
          <input type="radio" id="price1" name="$" />
          <label for="$$">$$</label>
          <input type="radio" id="price2" name="$$" />
          <label for="$$$$">$$$</label>
          <input type="radio" id="price3" name="$$" />
        </form>
        <p>Rating:</p>
        <form action="">
          <label for="1">1</label>
          <input type="radio" id="rating1" name="1" />
          <label for="2">2</label>
          <input type="radio" id="rating2" name="2" />
          <label for="3">3</label>
          <input type="radio" id="rating3" name="3" />
          <label for="4">4</label>
          <input type="radio" id="rating4" name="4" />
          <label for="5">5</label>
          <input type="radio" id="rating5" name="5" />
        </form>
        <div class="slidecontainer">
        <label for="distance">Max Distance:</label>
          <input type="range" min="1" max = "10" class="slider" id="distance"s/>
        </div>
        { PATRICK2 }
        <button onClick={increment}>Bunk off</button>
        <button onClick={increment}>Crack on</button>
      </div>
    );
  }
}

export default App;
