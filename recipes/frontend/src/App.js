import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import Recipe from './components/Recipe';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/category/:id" component={Category} />
        <Route path="/recipe/:id" component={Recipe} />
      </Switch>
    </Router>
  );
}

export default App;