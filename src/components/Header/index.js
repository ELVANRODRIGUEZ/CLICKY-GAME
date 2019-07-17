import React from "react";
import "./style.css";

function Header(props) {
  return (
    <div className="header bg-dark d-flex justify-content-center" >
      <div className="mainTitle d-block p-3 bg-white rounded-pill ">
        <h3 className="d-inline text-dark" onClick={props.click()}>{props.header}</h3>
      </div>
      {/* <div className="mainTitle d-block p-3 bg-white rounded-pill ">
        <h4 className="d-inline text-dark">RELOAD</h4>
      </div> */}
    </div>
  );
}

export default Header;
