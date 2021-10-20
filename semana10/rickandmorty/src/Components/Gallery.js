import React from "react"
import {useEffect, useState} from "react";
import Card from "./Card";

const url = "https://rickandmortyapi.com/api/character"

const Gallery = () =>{

  const [characters, setCharacters] = useState([]);

  useEffect(() =>{
    fetch(url)
      .then((data) => data.json())
      .then((data) =>{
        let newCharacters = [];
        for(const character of data.results){
          newCharacters.push({
            id: character.id,
            name: character.name,
            gender: character.gender,
            image: character.image,
            status: character.status,
          })
        }
        setCharacters(newCharacters);
      }).catch((error) => console.log(error));
  },[])


  return (
    <div className="container">
      {characters.map((character) =>{
        return (
            <Card id={character.id} name={character.name}
                  gender={character.gender} image={character.image}
                  status={character.status} />);
      })}
    </div>
  );
}

export default Gallery;