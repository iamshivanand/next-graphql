import React from "react";
import Image from "next/image";
import characterStyle from "../styles/Character.module.css";

const Character = ({ characters }) => {
  console.log("characters", characters);
  return (
    <div  className={characterStyle.main}>
      {characters.map((character) => {
        return (
          <div key={character.id} className={characterStyle.container}>
            <Image src={character.image} width={300} height={300} />
            <h4>{character.name}</h4>
            <p>Origin:{character.origin.name}</p>
            <p>Location:{character.location.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
