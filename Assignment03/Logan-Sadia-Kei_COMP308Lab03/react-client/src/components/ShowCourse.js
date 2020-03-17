import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Banner from "../banner.png";

function ShowCourse(props) {
  console.log("props.match.params", props.match.params.id);
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  const [courseData, setCourseData] = useState([]);
  const [showCourseLoading, setShowCourseLoading] = useState(true);
  const apiUrlCourse = "http://localhost:3000/api/courses";
  const [studentData, setStudentData] = useState([]);
  const [showStudentLoading, setShowStudentLoading] = useState(true);
  const apiUrlStudent = "http://localhost:3000/students";

  useEffect(() => {
    setShowLoading(false);
    setShowCourseLoading(false);
    setShowStudentLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);

      const resultCourse = await axios(apiUrlCourse);
      setCourseData(resultCourse.data);
      setShowCourseLoading(false);

      const resultStudent = await axios(apiUrlStudent);
      setStudentData(resultStudent.data);
      setShowStudentLoading(false);
    };

    fetchData();
  }, []);

  const editCourse = id => {
    props.history.push({
      pathname: "/editCourse/" + id
    });
  };
  const listCourse = id => {
    axios
      .get(apiUrlCourse)
      .then(result => {
        setShowLoading(false);
        props.history.push("/login");
      })
      .catch(error => setShowLoading(false));
  };

  const deleteCourse = id => {
    setShowLoading(true);
    const course = {
      courseCode: data.courseCode,
      courseName: data.courseName,
      section: data.section,
      semester: data.semester
    };
    //
    axios
      .delete(apiUrl, course)
      .then(result => {
        setShowLoading(false);
        props.history.push("/login");
      })
      .catch(error => setShowLoading(false));
  };

  let array = [];
  array.push(data);
  courseData.map(item => {
    if (
      array.find(
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

  //
  const displayStudentTable = studentData.map((student, idx) => {
    for (let i = 0; i < array.length; i++) {
      if (student.studentId === array[i].creator.studentId) {
        return (
          <tr key={idx}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.program}</td>
            <td>{student.email}</td>
          </tr>
        );
      }
    }
  });

  return (
    <div className="container">
      <div className="span12 div-style">
        <div>
          <img
            src={Banner}
            alt="Centennial College Banner"
            className="img-style-2"
          />
        </div>
        <h2 className="h2-style">Course Detail</h2>
        {showLoading && showCourseLoading && showStudentLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <Jumbotron>
          <h1>Course Code: {data.courseCode}</h1>
          <p>Course Name: {data.courseName}</p>
          <p>Section: {data.section}</p>
          <p>Semester: {data.semester}</p>
          <p>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                editCourse(data._id);
              }}
            >
              Edit My Course Info
            </Button>
            &nbsp;
            <Button
              type="button"
              variant="danger"
              onClick={() => {
                deleteCourse(data._id);
              }}
            >
              Delete My Course
            </Button>
            &nbsp;
            <Button
              type="button"
              variant="success"
              onClick={() => {
                listCourse();
              }}
            >
              View All of My Courses
            </Button>
          </p>
          <h3>Students enrolled for {data.courseCode}</h3>

          <div className="col-12 center div-style">
            <table className="table table-primary">
              <thead className="thead-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Program</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>{displayStudentTable}</tbody>
            </table>
          </div>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(ShowCourse);
