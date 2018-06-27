import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = () =>
  (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
        <h1>Hello World!</h1>
        <h2>It is {new Date().toString()}.</h2>
    </div>
  );



export default App;
