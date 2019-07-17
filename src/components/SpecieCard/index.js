import React from "react";
import "./style.css";

function SpecieCard(props) {
  // console.log(props);

  return (
    <div className="col-sm-3">
      <div className="img-thumbnail">
        <img
          alt={props.name}
          src={props.image}
          id={props.id}
          pair={props.pair}
          onClick={props.flip()}
        />
      </div>
    </div>
  );
}

export default SpecieCard;
