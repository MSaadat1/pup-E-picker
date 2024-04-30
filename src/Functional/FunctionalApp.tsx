import { useEffect, useState } from "react";
// import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
// import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export function FunctionalApp() {
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[] >([]);
  const [unFavoriteDogs, setUnFavoriteDogs] = useState<Dog[]>([]);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
   const refetchData = ()=>{
    return Requests.getAllDogs()
    .then((dogs) => {
      setAllDogs(dogs);
    })
   }

   useEffect(()=>{
    refetchData();
   },[]);
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection 
      allDogs={allDogs}
      setAllDogs = {setAllDogs}
      favoriteDogs={favoriteDogs}
      setFavoriteDogs={setFavoriteDogs}
      unFavoriteDogs={unFavoriteDogs}
      setUnFavoriteDogs={setUnFavoriteDogs}
      />
    </div>
  );
}
