import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Bootymenu from "./components/navbar";
import HomePage from "./home-page";
import AddBooty from "./components/add-booty";
import BootyDetails from "./components/booty-details";
import './App.css';
import EditDetails from "./components/edit-booty-details";

function App() {
  return (
    <Router>
      <div className="bootyapp">
        <Bootymenu />
        <Route path="/" exact component={HomePage} />
        <Route path="/add" component={AddBooty} />
        <Route path="/view/:id" component={BootyDetails} />
        <Route path="/edit/:id" component={EditDetails} />
      </div>
    </Router>
  );
}

export default App;
