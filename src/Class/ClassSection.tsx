// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppState } from "./ClassApp";
import { ClassDogs } from "./ClassDogs";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { TActiveTab } from "./ClassApp";
import { FunctionalCreateDogForm } from "../Functional/FunctionalCreateDogForm";

export class ClassSection extends Component<AppState> {
  handleActiveTab = (tab: TActiveTab) => {
    const nextView = this.props.currentView === tab ? "all" : tab;
    this.props.setCurrentView(nextView);
  };

  render() {
    const {
      isLoading,
      allDogs,
      currentView,
      favoritedDogs,
      unfavoritedDogs,
      handleFilledHeartClick,
      handleEmptyHeartClick,
      handleDeleteClick,
      createDog
    } = this.props;

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

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                currentView === "favorited" ? "active" : ""
              }`}
              onClick={() => this.handleActiveTab("favorited")}
            >
              favorited ( {favoritedDogs.length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                currentView === "unfavorited" ? "active" : ""
              }`}
              onClick={() => this.handleActiveTab("unfavorited")}
            >
              unfavorited ({unfavoritedDogs.length} )
            </div>
            <div className={`selector active ${
              currentView === "createDog" ? "active" : ""
            }`} onClick={()=> this.handleActiveTab("createDog")}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">
          {currentView !== "createDog" && (
            <ClassDogs>
              {dogsList[currentView].map((dog) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onTrashIconClick={() => {
                    handleDeleteClick(dog.id);
                  }}
                  onHeartClick={() => {
                    handleFilledHeartClick(dog.id, dog.isFavorite);
                  }}
                  onEmptyHeartClick={() => {
                    handleEmptyHeartClick(dog.id, !dog.isFavorite);
                  }}
                  isLoading={isLoading}
                />
              ))}
            </ClassDogs>
          )}
          {currentView === "createDog" && (
            <FunctionalCreateDogForm
            createDog={createDog}
            />
          )}
        </div>
      </section>
    );
  }
}
