import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";
import Banner1 from "../centennial-college.jpg";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = id => {
    props.history.push({
      pathname: "/show/" + id
    });
  };

  return (
    <div className="container">
      <div className="span12 div-style">
        <div>
          <img
            src={Banner1}
            alt="Centennial College Banner1"
            className="img-style-1"
          />
        </div>
        <h2 className="h2-style">List Of Students</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <h5 class="paddings">Click on student to see student details.</h5>
        <ListGroup>
          {data.map((item, idx) => (
            <ListGroup.Item
              key={idx}
              action
              onClick={() => {
                showDetail(item._id);
              }}
            >
              {"Student ID:  " + item.studentId}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default withRouter(List);
