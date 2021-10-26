import React from 'react'

export const Card = (props) => {
  return (
    <div className="item">
      <img src={props.image} alt={props.name}/>
      <div className="text">
        <h3>Name: {props.name}</h3>
        <h2>Description: {props.description}</h2>
        <h2>Comics: {props.comics}</h2>
        <h2>Series: {props.series}</h2>
        <h2>Stories: {props.stories}</h2>
      </div>
    </div>
  )
}