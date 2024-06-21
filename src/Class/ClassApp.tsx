import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { Dog } from "../types.ts";
import { Requests } from "../api.tsx";

export type TActiveTab = "all" | "favorited" | "unfavorited" | "createDog";
export interface AppState {
  isLoading: boolean;
  allDogs: Dog[];
  currentView: TActiveTab;
  favoritedDogs: Dog[];
  unfavoritedDogs: Dog[];
  setIsLoading: (isLoading: boolean) => void;
  setAllDogs: (allDogs: Dog[]) => void;
  setCurrentView: (currentView: TActiveTab) => void;
  handleFilledHeartClick: (id: number, isFavorite: boolean) => Promise<void>;
  handleEmptyHeartClick: (id: number, isFavorite: boolean) => Promise<void>;
  handleDeleteClick: (id: number) => Promise<void>;
  createDog: (dogDate: Omit<Dog, "id">) => Promise<void>;
}
export class ClassApp extends Component<{}, AppState> {
  state: AppState = {
    isLoading: false,
    allDogs: [],
    currentView: "all",
    favoritedDogs: [],
    unfavoritedDogs: [],
    setIsLoading: function (): void {
      throw new Error("Function not implemented.");
    },
    setAllDogs: function (): void {
      throw new Error("Function not implemented.");
    },
    setCurrentView: function (): void {
      throw new Error("Function not implemented.");
    },
    handleFilledHeartClick: function (): Promise<void> {
      throw new Error("Function not implemented.");
    },
    handleEmptyHeartClick: function (): Promise<void> {
      throw new Error("Function not implemented.");
    },
    handleDeleteClick: function (): Promise<void> {
      throw new Error("Function not implemented.");
    },
    createDog: function (): Promise<void> {
      throw new Error("Function not implemented.");
    },
  };

  setIsLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };
  setAllDogs = (allDogs: Dog[]) => {
    this.setState({ allDogs });
  };
  setCurrentView = (currentView: TActiveTab) => {
    this.setState({ currentView });
  };
  getFavoritedDogs = () => {
    return this.state.allDogs.filter((dog) => dog.isFavorite);
  };
  getUnFavoritedDogs = () => {
    return this.state.allDogs.filter((dog) => !dog.isFavorite);
  };

  componentDidMount(): void {
    this.refetchData();
  }

  refetchData = () => {
    return Requests.getAllDogs().then((dogs) => {
      this.setAllDogs(dogs);
    });
  };

  handleFilledHeartClick = (id: number, isFavorite: boolean) => {
    this.setIsLoading(true);
    return Requests.updateDog(id, {
      isFavorite: !isFavorite,
    })
      .then(() => this.refetchData())
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  handleEmptyHeartClick = (id: number, isFavorite: boolean) => {
    this.setIsLoading(true);
    return Requests.updateDog(id, {
      isFavorite: isFavorite,
    })
      .then(() => this.refetchData())
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  handleDeleteClick = (id: number) => {
    this.setIsLoading(true);
    return Requests.deleteDog(id)
      .then(() => this.refetchData())
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  createDog = (dogs: Omit<Dog, "id">) => {
    return Requests.postDog(dogs).then(() => {
      this.refetchData();
    });
  };
  render() {
    const { allDogs, currentView, isLoading } = this.state;
    const favoritedDogs = this.getFavoritedDogs();
    const unfavoritedDogs = this.getUnFavoritedDogs();

    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          isLoading={isLoading}
          allDogs={allDogs}
          currentView={currentView}
          favoritedDogs={favoritedDogs}
          unfavoritedDogs={unfavoritedDogs}
          setIsLoading={this.setIsLoading}
          setAllDogs={this.setAllDogs}
          setCurrentView={this.setCurrentView}
          handleFilledHeartClick={this.handleFilledHeartClick}
          handleEmptyHeartClick={this.handleEmptyHeartClick}
          handleDeleteClick={this.handleDeleteClick}
          createDog={this.createDog}
        />

        {/* should be inside of the ClassSection component using react children */}
        {/* <ClassDogs /> */}
        {/* <ClassCreateDogForm /> */}
      </div>
    );
  }
}
