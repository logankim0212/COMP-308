import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import { withRouter } from "react-router-dom";
import Banner1 from "../centennial-college.jpg";

function ListCourses(props) {
  const studentId = props.screen;
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses";

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = id => {
    props.history.push({
      pathname: "/showCourse/" + id
    });
  };

  const displayCourseList = data.map((course, idx) => {
    console.log(course.creator._id);
    if (course.creator.studentId == studentId) {
      return (
        <tr
          key={idx}
          onClick={() => {
            showDetail(course._id);
          }}
        >
          <td>{course.courseCode}</td>
          <td>{course.courseName}</td>
          <td>{course.section}</td>
          <td>{course.semester}</td>
        </tr>
      );
    }
  });

  return (
    <div className="container">
      <div className="col-12 div-style">
        <h2 className="h2-style">List of My Courses</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <div class="col-12 center paddings div-style">
            <h5>Click on course to see course details.</h5>
            <table class="table table-primary">
              <thead class="thead-dark">
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Section</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody class="cursor tr">{displayCourseList}</tbody>
            </table>
          </div>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(ListCourses);
