import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
//
import List from "./components/List";
import ListCourses from "./components/ListCourses";
import ListAllCourses from "./components/ListAllCourses";
import EditStudent from "./components/EditStudent";
import EditCourse from "./components/EditCourse";

import CreateStudent from "./components/CreateStudent";
import ShowStudent from "./components/ShowStudent";
import ShowCourse from "./components/ShowCourse";
import ShowCourseView from "./components/ShowCourseView";

import Home from "./components/Home";
import Login from "./components/Login";
//
function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Profile</Nav.Link>
            <Nav.Link href="/list">List of Students</Nav.Link>
            <Nav.Link href="/listallcourses">List of All Courses</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <Login />} path="/login" />
        <Route render={() => <List />} path="/list" />
        <Route render={() => <ListCourses />} path="/listcourses" />
        <Route render={() => <ListAllCourses />} path="/listallcourses" />
        <Route render={() => <EditStudent />} path="/edit/:id" />
        <Route render={() => <EditCourse />} path="/editCourse/:id" />
        <Route render={() => <CreateStudent />} path="/create" />
        <Route render={() => <ShowStudent />} path="/show/:id" />
        <Route render={() => <ShowCourse />} path="/showcourse/:id" />
        <Route render={() => <ShowCourseView />} path="/showcourseview/:id" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
