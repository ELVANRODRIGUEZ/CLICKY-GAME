import React from "react";
import "./style.css";

function FriendCard(props) {
  // console.log(props);
  return (props.selected !== props.id ?
      <div className="img-thumbnail" id={props.id} onClick={props.shuffle()}>
        <img alt={props.name} src={props.backImage} />
      </div> :
      <div className="img-thumbnail" id={props.id} onClick={props.shuffle()}>
      <img alt={props.name} src={props.image} />
    </div> 
  );
}

export default FriendCard;
