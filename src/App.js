import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/State';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Welcome from './Components/Welcome';
import "./App.css"

export default function App() {
  return (
      <NoteState>
        <Router>
          <Navbar />
          <div className="container my-3">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/welcome">
                <Welcome />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
  )
}
