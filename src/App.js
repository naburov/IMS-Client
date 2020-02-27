import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DicomCanvas } from './components/DicomCanvas';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios, { post } from 'axios';
import { DicomCanvasQuad } from './components/DicomCanvas-2';
import { Router } from './components/Router';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
