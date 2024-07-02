import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { Requests } from "../api";
import { Dog } from "../types";
import toast from "react-hot-toast";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";

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
      // toast.success('The dogs were successfully fetched!');
    });
  };

  useEffect(() => {
    refetchData();
  }, []);

  const handleFavoritedDogs = (id: number, isFavorite: boolean) => {
    setIsLoading(true);
    return Requests.updateDog(id, {
      isFavorite: isFavorite,
    })
      .then(() => refetchData())
      .then(() => {
        toast.success("The dog was updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to updated the dog!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteDog = (id: number) => {
    setIsLoading(true);
    return Requests.deleteDog(id)
      .then(() => refetchData())
      .then(() => {
        toast.success("The dog was deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete the dog!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateDog = (dogs: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dogs)
      .then(() => refetchData())
      .then(() => {
        toast.success("The dog was created successfully!");
      })
      .catch(() => {
        toast.error("Failed to create the dog!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const dogsList: Record<TActiveTab, Dog[]> = {
    all: allDogs,
    favorited: favoritedDogs,
    unfavorited: unfavoritedDogs,
    createDog: [],
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        dogsList={dogsList}
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        {currentView === "createDog" && (
          <FunctionalCreateDogForm
            isLoading={isLoading}
            createDog={handleCreateDog}
          />
        )}
        {currentView !== "createDog" && (
          <FunctionalDogs
            dogsList={dogsList}
            currentView={currentView}
            handleFavoritedDogs={handleFavoritedDogs}
            deleteDog={handleDeleteDog}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
