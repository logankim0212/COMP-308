import CreateCourse from "./CreateCourse";
import ListCourses from "./ListCourses";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//
import axios from "axios";
import Banner1 from "../centennial-college.jpg";
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [course, setCourse] = useState("");
  //
  const [courses, setCourses] = useState("");
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const getData = async () => {
    try {
      const res = await axios.get("/welcome");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //
  const createCourse = () => {
    console.log("in createCourse");
    setCourse("y");
  };
  //
  // const listCourses = () => {
  //   console.log("in courseList");
  //   setCourses("x");
  // };

  return (
    <div className="container-fluid ">
      <div className="col-12 ">
        {course !== "y" ? (
          <div className="App">
            <p>{screen}</p>
            <p>{data}</p>
            <div className="btn-group margin-bottom" role="group">
              <button
                onClick={getData}
                className="btn btn-secondary"
                type="button"
              >
                Get Data
              </button>
              {/* <button
                onClick={createCourse}
                class="btn btn-secondary"
                type="button"
              >
               Students List
              </button> */}
              {/* <button
                onClick={listCourses}
                class="btn btn-secondary"
                type="button"
              >
                List Courses
              </button> */}
              <button
                onClick={deleteCookie}
                className="btn btn-secondary"
                type="button"
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <CreateCourse screen={screen} setScreen={setScreen} />
        )}
      </div>
      <div className="div-left">
        <CreateCourse screen={screen} setScreen={setScreen} />
      </div>
      <div className="div-right">
        {<ListCourses screen={screen} setScreen={setScreen} />}
      </div>
    </div>
  );
}

//
export default View;
