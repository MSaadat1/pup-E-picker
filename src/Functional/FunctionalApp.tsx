import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";

export type TActiveTab = "all" | "favorited" | "unfavorited" | "createDog";

export function FunctionalApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [currentView, setCurrentView] = useState<TActiveTab>("all");
  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);
  const refetchData = () => {
    return Requests.getAllDogs().then((dogs) => {
      setAllDogs(dogs);
    });
  };

  useEffect(() => {
    refetchData();
  }, []);

  const handleFilledHeartClick = (id: number, isFavorite: boolean) => {
    setIsLoading(true);
    return Requests.updateDog(id, {
      isFavorite: !isFavorite,
    })
    .then(() => refetchData())
    .finally(()=>{
      setIsLoading(false)
    })
  };

  const handleEmptyHeartClick = (id: number, isFavorite: boolean) => {
    setIsLoading(true);
    return Requests.updateDog(id, {
      isFavorite: isFavorite,
    })
      .then(() => refetchData())
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteClick = (id: number) => {
    setIsLoading(true);
    return Requests.deleteDog(id)
      .then(() => refetchData())
      .finally(() => {
        setIsLoading(false);
      });
  };

  const createDog = (dogs: Omit<Dog, "id">) => {
    return Requests.postDog(dogs).then(() => {
      refetchData();
    });
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        currentView={currentView}
        favoritedDogs={favoritedDogs}
        unfavoritedDogs={unfavoritedDogs}
        setCurrentView={setCurrentView}
        createDog={createDog}
        isLoading={isLoading}
        handleEmptyHeartClick={handleEmptyHeartClick}
        handleDeleteClick={handleDeleteClick}
        handleFilledHeartClick={handleFilledHeartClick}
      />
    </div>
  );
}
