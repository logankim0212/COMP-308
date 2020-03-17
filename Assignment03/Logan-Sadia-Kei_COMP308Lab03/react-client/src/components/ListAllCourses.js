import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Banner1 from "../centennial-college.jpg";

function ListAllCourses(props) {
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
      pathname: "/showCourseView/" + id
    });
  };

  let array = [];
  data.map(item => {
    if (
      !array.find(
        course =>
          course.courseCode === item.courseCode &&
          course.courseName === item.courseName &&
          course.section === item.section &&
          course.semester === item.semester
      )
    ) {
      array.push(item);
      return item;
    }
  });

  const displayAllCourseTable = array.map((course, idx) => {
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
  });

  return (
    <div className="container">
      <div className="col-12 div-style">
        <div>
          <img
            src={Banner1}
            alt="Centennial College Banner1"
            className="img-style-1"
          />
        </div>
        <h2 className="h2-style">List Of Courses</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {/* <h3>
          Courses for {data.firstName} {data.lastName}
        </h3> */}
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
            <tbody class="tr">{displayAllCourseTable}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withRouter(ListAllCourses);
