import "../App.css";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { TActiveTab } from "./FunctionalApp";

type TFunctionalDogProps = {
  dogsList: Record<TActiveTab, Dog[]>;
  currentView: TActiveTab;
  handleFavoritedDogs: (id: number, isFavorite: boolean) => Promise<void>;
  deleteDog: (id: number) => Promise<void>;
  isLoading: boolean;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  dogsList,
  currentView,
  handleFavoritedDogs,
  deleteDog,
  isLoading,
}: TFunctionalDogProps) => {
  return (
    <>
      {dogsList[currentView].map((dog) => {
        const { id, name, description, isFavorite, image } = dog;
        return (
          <DogCard
            dog={{
              id,
              image,
              description,
              isFavorite,
              name,
            }}
            key={1}
            onTrashIconClick={() => {
              deleteDog(id);
            }}
            onHeartClick={() => {
              handleFavoritedDogs(id, !isFavorite);
            }}
            onEmptyHeartClick={() => {
              handleFavoritedDogs(id, !isFavorite);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
