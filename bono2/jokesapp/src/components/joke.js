import React from 'react'
import crypto from "crypto"
import {useState, useEffect} from "react";

export const Joke = (props) => {
  let [joke,setJoke] = useState("")
  let privateKey = "135929fee5289dfbe60a9c283a2eabffb0b7f92b";
  let publicKey = "c8c7497ecd7357a55077cd12b656e6e8";
  let tempTs = new Date().getTime();
  tempTs = tempTs.toString();

  let md5sum = crypto.createHash('md5');
  md5sum.update(tempTs+privateKey+publicKey);
  let add = md5sum.digest("hex")
  let params = {ts: tempTs, hash: add, apikey: publicKey};

  let url = new URL("https://gateway.marvel.com/v1/public/characters");
  url.search = new URLSearchParams(params).toString()
  fetch(url.toString()).
  then((data) => data.json()).
  then((data) => console.log(data)).
  catch((error) => console.log(error))


  useEffect(()=>{
    if(!navigator.onLine){
      if(localStorage.getItem("joke") === null) {
        setJoke("Loading...")
      } else {
        setJoke(localStorage.getItem("joke"));
      }
    } else {
      const URL = "https://api.chucknorris.io/jokes/random";
      fetch(URL).then(res=>res.json()).then(res=>{
        setJoke(res.value);
        localStorage.setItem("joke", res.value);
      })
    }
  }, []);

  return (
    <section>
      <h1>Joke</h1>
      <p>{joke}</p>
    </section>
  )
}

