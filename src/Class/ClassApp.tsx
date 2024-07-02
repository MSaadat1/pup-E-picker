import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Dog } from "../types.ts";
import { Requests } from "../api.tsx";
import { ClassCreateDogForm } from "./ClassCreateDogForm.tsx";
import { ClassDogs } from "./ClassDogs.tsx";
import toast from "react-hot-toast";

export type TActiveTab = "all" | "favorited" | "unfavorited" | "createDog";
export type AppState = {
  dogsList: Record<TActiveTab, Dog[]>;
  isLoading: boolean;
  allDogs: Dog[];
  currentView: TActiveTab;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
};
export class ClassApp extends Component<Record<string, never>, AppState> {
  state: AppState = {
    isLoading: false,
    allDogs: [],
    dogsList: {
      all: [],
      favorited: [],
      unfavorited: [],
      createDog: [],
    },
    currentView: "all",
    favoritedDogs: [],
    unfavoritedDogs: [],
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };
  setAllDogs = (allDogs: Dog[]) => {
    const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
    const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);
    const dogsList = {
      all: allDogs,
      favorited: favoritedDogs,
      unfavorited: unfavoritedDogs,
      createDog: [],
    };
    this.setState({ allDogs, dogsList, favoritedDogs, unfavoritedDogs });
  };
  setCurrentView = (currentView: TActiveTab) => {
    this.setState({ currentView });
  };

  componentDidMount(): void {
    this.refetchData();
  }

  refetchData = () => {
    this.setIsLoading(true);
    return Requests.getAllDogs()
      .then((dogs) => {
        this.setAllDogs(dogs);
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  handleFavoritedDogs = (id: number, isFavorite: boolean) => {
    this.setIsLoading(true);
    return Requests.updateDog(id, {
      isFavorite: isFavorite,
    })
      .then(() => this.refetchData())
      .then(() => {
        toast.success("The dog was updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to updated the dog!");
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  handleDeleteClick = (id: number) => {
    this.setIsLoading(true);
    return Requests.deleteDog(id)
      .then(() => this.refetchData())
      .then(() => {
        toast.success("The dog was deleted successfully!");
      })
      .catch(() => {
        toast.error("Failed to delete the dog!");
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  handleCreateDog = (dogs: Omit<Dog, "id">) => {
    this.setIsLoading(true);
    return Requests.postDog(dogs)
      .then(() => {
        this.refetchData();
      })
      .then(() => {
        toast.success("The dog was created successfully!");
      })
      .catch(() => {
        toast.error("Failed to create the dog!");
      })
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  render() {
    const { currentView, dogsList, isLoading } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          dogsList={dogsList}
          currentView={currentView}
          setCurrentView={this.setCurrentView}
        >
          {currentView === "createDog" && (
            <ClassCreateDogForm
              isLoading={isLoading}
              createDog={this.handleCreateDog}
            />
          )}
          {currentView !== "createDog" && (
            <ClassDogs
              dogsList={dogsList}
              currentView={currentView}
              handleFavoritedDogs={this.handleFavoritedDogs}
              deleteDog={this.handleDeleteClick}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
