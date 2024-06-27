import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { TActiveTab } from "./ClassApp";
import { Dog } from "../types";

type TClassDogProps = {
  dogsList: Record<TActiveTab, Dog[]>;
  currentView: TActiveTab;
  handleFavoritedDogs: (id: number, isFavorite: boolean) => Promise<void>;
  deleteDog: (id: number) => Promise<void>;
  isLoading: boolean;
};

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<TClassDogProps> {
  render() {
    const { dogsList, currentView, deleteDog, handleFavoritedDogs, isLoading } =
      this.props;
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
  }
}
