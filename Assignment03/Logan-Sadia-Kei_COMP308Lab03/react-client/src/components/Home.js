import { withRouter } from "react-router-dom";

import React from "react";
import Banner from "../banner.png";

function Home(props) {
  return (
    <div className="container">
      <div className="span12 div-style">
        <div>
          <img src={Banner} alt="Centennial College Banner" className="img-style" />
        </div>
        <h2 className="h2-style"> Centennial College Student Course App</h2>
        <p className="p-style">
          React front-end calls Express REST API to add, list, update, or delete
          a user, create a course etc.
        </p>
      </div>
    </div>
  );
}

export default withRouter(Home);
