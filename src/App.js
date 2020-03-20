import React from 'react';
import './App.css';
import { Router } from './components/Router';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './store/reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middlewares = [thunk, logger]

const store = createStore(rootReducer, applyMiddleware(thunk))


class App extends React.Component {

  render() {
    console.log(store.getState())
    return (
      <Provider store = {store}>
        <div className="App">
          <BrowserRouter>
            <Router></Router>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
