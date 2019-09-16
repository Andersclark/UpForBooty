import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar";
import BootyList from "./components/booty-list";
import AddBooty from "./components/add-booty";
import BootyDetails from "./components/booty-details";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={BootyList} />
        <Route path="/add" component={AddBooty} />
        <Route path="/view/:id" component={BootyDetails} />
      </div>
    </Router>
  );
}

export default App;
