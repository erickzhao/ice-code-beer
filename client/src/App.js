import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

var csvConverter;csvConverter=csvConverter||{},function(){"use strict";return csvConverter={convert:function(e){var t="object"!=typeof e?JSON.parse(e):e,r=Object.keys(t[0]),n=this.parseHeaders(r,t),o=this.parseBody(t,n);return this.open(o)},parseHeaders:function(e){var t="";return e.forEach(function(e){t+=e+","}),t+="\r\n"},parseBody:function(e,t){var r,n,o;return e.forEach(function(e,c){o="";for(c in e)""!==o&&(o+=","),r=/\,/,"string"==typeof(n=e[c])&&(n=r.test(n)?'"'+n+'"':n),o+=n;t+=o+"\r\n"}),t},open:function(e){if(Object.hasOwnProperty.call(window,"ActiveXObject")&&!window.ActiveXObject){var t=new Blob([e],{type:"text/csv;charset=utf-8;"});return window.navigator.msSaveBlob(t,"tcm-01.csv")}var r="data:text/csv;charset=utf-8,"+escape(e),n=document.createElement("a");return n.setAttribute("href",r),n.setAttribute("download","download.csv"),document.body.appendChild(n),n.click(),window.open(r)}}}.call(this);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      PATRICK: null,
      index: 0,
      saved: {}
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
    const download = () => {
      const data = JSON.parse(localStorage.getItem('pubs'));
      csvConverter.convert(data);
    }
    const gerts = () => {
      if (this.state.PATRICK && this.state.index < this.state.PATRICK.length) {
        this.setState({
          index: this.state.index + 1
        })
        const saved = JSON.parse(localStorage.getItem('pubs')) || [];
        saved.push(this.state.PATRICK[this.state.index]);
        localStorage.setItem('pubs', JSON.stringify(saved));
      }
    }
    const hurts = () => {
      if (this.state.PATRICK && this.state.index < this.state.PATRICK.length) {
        this.setState({
          index: this.state.index + 1
        })
      }
    }
    const { PATRICK, index } = this.state;
    const PATRICK2 = PATRICK && [PATRICK[index]].map(p => (
      <div className="App-intro" key={p.id}>
        <img className="bar-image" src={p.image_url}/>
        <h1>{p.name}</h1>
        <p>{p.location.display_address.join(", ")}</p>
        <p>{p.price}</p>
        <p>Rating: {p.rating}</p>
        <p>Distance: {(p.distance/1000).toFixed(1)} km</p>
      </div>
    ))
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FIND BARS TO GO TO ON ST.PATRICK'S DAY</h1>
        </header>
        { PATRICK2 }
        <button onClick={hurts}>IT HURTS</button>
        <button onClick={gerts}>IT GERTS</button>
        <button onClick={download}>DOWNLOAD</button>
        <br/>
      </div>
    );
  }
}

export default App;
