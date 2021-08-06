import React from 'react';
import ReactDOM from 'react-dom';
import './Style/reset.css';
import './index.css';
import Header from './Conponents/Header';
import Thread from './Conponents/Thread';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Thread />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
