// you can use this type for react children if you so choose
//import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";
import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

interface FunctionalSectionProps {
  allDogs: Dog[];
  setAllDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  favoriteDogs: Dog[];
  setFavoriteDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
  unFavoriteDogs: Dog[];
  setUnFavoriteDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  allDogs,
  setAllDogs,
  favoriteDogs,
  setFavoriteDogs,
  unFavoriteDogs,
  setUnFavoriteDogs,
}) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const handleFavoriteDogs = () => {
    setActiveTab("favoriteDogs");
  };

  const handleUnFavoriteDogs = () => {
    setActiveTab("unFavoriteDogs");
  };

  const handleUpdateFavoriteStatus = (id: number, isFavorite: boolean) => {
    const updatedDogs = allDogs.map((dog) =>
      dog.id === id ? { ...dog, isFavorite: !isFavorite } : dog
    );
    setAllDogs(updatedDogs);
    Requests.updateDog(id, {
      isFavorite: !isFavorite,
      name: "",
      image: "",
      description: "",
      id: 0,
    }).then(() => {
      const updateFavorites = updatedDogs.filter((dog) => dog.isFavorite);
      const updateUnFavorites = updatedDogs.filter((dog) => !dog.isFavorite);
      setAllDogs(updatedDogs);
      setFavoriteDogs(updateFavorites);
      setUnFavoriteDogs(updateUnFavorites);
    });
  };

  const handleEmptyHeartClick = (id: number, isFavorite: boolean) => {
    const updatedDogs = allDogs.map((dog) =>
      dog.id === id ? { ...dog, isFavorite: true } : dog
    );
    Requests.updateDog(id, {
      isFavorite: isFavorite,
      name: "",
      image: "",
      description: "",
      id: 0,
    }).then(() => {
      const updateUnFavorites = updatedDogs.filter((dog) => dog.isFavorite);
      const updateFavorites = updatedDogs.filter((dog) => dog.isFavorite);
      setAllDogs(updatedDogs);
      setUnFavoriteDogs(updateUnFavorites);
      setFavoriteDogs(updateFavorites);
    });
  };

  const handleDeleteClick = (id: number) => {
    Requests.deleteDog(id).then(() => {
      const updatedDogs = allDogs.filter((dog) => dog.id !== id);
      setAllDogs(updatedDogs);
      const updateFavorites = updatedDogs.filter((dog) => dog.isFavorite);
      const updateUnFavorites = updatedDogs.filter((dog) => !dog.isFavorite);
      setFavoriteDogs(updateFavorites);
      setUnFavoriteDogs(updateUnFavorites);
    });
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
            className={`selector ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            All Dogs
          </div>
          <div
            className={`selector ${
              activeTab === "favoriteDogs" ? "active" : ""
            }`}
            onClick={handleFavoriteDogs}
          >
            Favorited Dogs({favoriteDogs.length})
          </div>
          <div
            className={`selector ${
              activeTab === "unFavoriteDogs" ? "active" : ""
            }`}
            onClick={handleUnFavoriteDogs}
          >
            Unfavorited Dogs({unFavoriteDogs.length})
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => handleTabClick("create")}
          >
            Create Dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {activeTab === "all" && (
          <FunctionalDogs>
            {allDogs.map((dog) => (
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
                  handleUpdateFavoriteStatus(dog.id, dog.isFavorite);
                }}
                isLoading={false}
              />
            ))}
          </FunctionalDogs>
        )}
        {activeTab === "favoriteDogs" && (
          <FunctionalDogs>
            {favoriteDogs.map((dog) => (
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
                  handleUpdateFavoriteStatus(dog.id, dog.isFavorite);
                }}
                isLoading={false}
              />
            ))}
          </FunctionalDogs>
        )}
        {activeTab === "unFavoriteDogs" && (
          <FunctionalDogs>
            {unFavoriteDogs.map((dog) => (
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
                  handleUpdateFavoriteStatus(dog.id, dog.isFavorite);
                }}
                isLoading={false}
              />
            ))}
          </FunctionalDogs>
        )}
        {activeTab === "create" && (
          <FunctionalCreateDogForm>
            
          </FunctionalCreateDogForm>
        )}
        {/* <FunctionalDogs>
          {activeTab === "all" &&
            allDogs.map((dog) => (
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
                  handleUpdateFavoriteStatus(dog.id, dog.isFavorite);
                }}
                isLoading={false}
              />
            ))}
          {activeTab === "favoriteDogs" &&
            favoriteDogs.map((dog) => (
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
                  handleUpdateFavoriteStatus(dog.id, dog.isFavorite);
                }}
                isLoading={false}
              />
            ))}
          {activeTab === "unFavoriteDogs" &&
            unFavoriteDogs.map((dog) => (
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
                  handleUpdateFavoriteStatus(dog.id, dog.isFavorite);
                }}
                isLoading={false}
              />
            ))}
        </FunctionalDogs>
        
        <FunctionalCreateDogForm/> */}
      </div>
    </section>
  );
};
