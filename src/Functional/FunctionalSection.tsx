// you can use this type for react children if you so choose
//import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Dispatch, SetStateAction} from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { TActiveTab } from "./FunctionalApp";

interface FunctionalSectionProps {
  allDogs: Dog[];
  currentView: TActiveTab;
  setCurrentView: Dispatch<SetStateAction<TActiveTab>>;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  handleDeleteClick: (id: number) => Promise<void>;
  handleEmptyHeartClick: (id: number, isFavorite: boolean) => Promise<void>;
  handleFilledHeartClick: (id: number, isFavorite: boolean) => Promise<void>;
  createDog: (dogData: Omit<Dog, "id">) => Promise<void>;
  isLoading: boolean;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  allDogs,
  currentView,
  setCurrentView,
  favoritedDogs,
  unfavoritedDogs,
  handleDeleteClick,
  handleEmptyHeartClick,
  handleFilledHeartClick,
  createDog,
  isLoading,
}) => {
  const handleActiveTab = (tab: TActiveTab) => {
    const nextView = tab === currentView ? "all" : tab;
    setCurrentView(nextView);
  };

  const dogsList: Record<TActiveTab, Dog[]> = {
    all: allDogs,
    favorited: favoritedDogs,
    unfavorited: unfavoritedDogs,
    createDog: [],
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <div
            className={`selector ${
              currentView === "favorited" ? "active" : ""
            }`}
            onClick={() => handleActiveTab("favorited")}
          >
            Favorited Dogs({favoritedDogs.length})
          </div>
          <div
            className={`selector ${
              currentView === "unfavorited" ? "active" : ""
            }`}
            onClick={() => handleActiveTab("unfavorited")}
          >
            Unfavorited Dogs({unfavoritedDogs.length})
          </div>
          <div
            className={`selector ${
              currentView === "createDog" ? "active" : ""
            }`}
            onClick={() => handleActiveTab("createDog")}
          >
            Create Dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {currentView !== "createDog" && (
          <FunctionalDogs>
            {dogsList[currentView].map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                onTrashIconClick={() => {
                  handleDeleteClick(dog.id);
                }}
                onEmptyHeartClick={() => {
                  handleEmptyHeartClick(dog.id, !dog.isFavorite);
                }}
                onHeartClick={() => {
                  handleFilledHeartClick(dog.id, dog.isFavorite);
                }}
                isLoading={isLoading}
              />
            ))}
          </FunctionalDogs>
        )}

        {currentView === "createDog" && (
          <FunctionalCreateDogForm
            createDog={createDog}
            //isLoading={isLoading}
          />
        )}
      </div>
    </section>
  );
};
