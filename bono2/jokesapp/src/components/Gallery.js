import React from "react";
import {useEffect,useState} from "react";
import {Card} from "./Card";
import crypto from "crypto";

function createCharacters(characterArray){
  let ans = characterArray.map((rawCharacter) => {
    return {name:rawCharacter.name,
      description: rawCharacter.description,
      image: rawCharacter.thumbnail.path + '.' +rawCharacter.thumbnail.extension,
      comics: rawCharacter.comics.available,
      series: rawCharacter.series.available,
      stories: rawCharacter.stories.available,
    };
  });
  console.log("")
  return ans;
}

async function fetchCharacters(){
  let tempTs = new Date().getTime();
  tempTs = tempTs.toString();

  let md5sum = crypto.createHash('md5');
  md5sum.update(tempTs+privateKey+publicKey);
  let add = md5sum.digest("hex")
  let params = {ts: tempTs, hash: add, apikey: publicKey};

  let url = new URL("https://gateway.marvel.com/v1/public/characters");
  url.search = new URLSearchParams(params).toString()

  try {
    let data = await fetch(url.toString());
    data = await data.json();
    let ans = createCharacters(data.data.results);
    return ans;
  }catch{
    return [];
  }
}



export const Gallery = () => {
  const [characters,setCharacters] = useState([]);

  useEffect(() =>{
    if(!navigator.onLine){
      if(localStorage.getItem("characters") === null) {
        setCharacters([]);
      } else {
        setCharacters(JSON.parse(localStorage.getItem("characters")));
      }
    } else {
        fetchCharacters().then((toUse) =>{
          setCharacters(toUse);
          localStorage.setItem("characters", JSON.stringify(toUse));
        });
    }
  },[])

  return (
    <div className="container">
      {characters.map((character) =>{
        return (
          <Card id={character.id} name={character.name}
                description={character.description} image={character.image}
                comics={character.comics} series={character.series}
                stories={character.stories}/>);
      })}
    </div>
  )
}