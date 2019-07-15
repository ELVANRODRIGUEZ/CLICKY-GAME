import React from "react";
import "./style.css";

function Header(props) {
  return (
    <div className="header bg-dark d-flex justify-content-center" >
      <div className="mainTitle d-inline p-3 bg-white rounded-pill ">
        <h3 className="d-inline text-dark">SPECIES MEMORY GAME</h3>
      </div>
    </div>
  );
}

export default Header;
