import React from 'react'

const Card = (props) =>{
  return (
    <div className="item">
      <img src={props.image} alt={props.name}/>
      <div className="text">
        <h3>Name: {props.name}</h3>
        <h2>Gender: {props.gender}</h2>
        <h2>Status: {props.status}</h2>
      </div>
    </div>
  );
}

export default Card;