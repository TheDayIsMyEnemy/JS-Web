import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

let counter = 0;

const increment = () => {
  counter++;
  updateElement();
  ReactDOM.render(App , document.getElementById('root'));

}

// React elements are immutable. Once you create an element, you can’t change its children or attributes.
// The only way to update the UI is to create a new element, and pass it to ReactDOM.render()
// This was made only for the Rendering Elements exercise. 
// In practice, most React apps only call ReactDOM.render() once.

function updateElement(){
  App = (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        Counter:     {counter}
      </p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

let App =  (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        Counter:     {counter}
      </p>
      <button onClick={increment}>Increment</button>
      </div>
    );

export default App;
