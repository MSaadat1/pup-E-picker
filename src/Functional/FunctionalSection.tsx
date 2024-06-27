// you can use this type for react children if you so choose

import { Link } from "react-router-dom";
import { Dog } from "../types";
import { Dispatch, SetStateAction } from "react";
import { TActiveTab } from "./FunctionalApp";

interface FunctionalSectionProps {
  dogsList: Record<TActiveTab, Dog[]>;
  currentView: TActiveTab;
  setCurrentView: Dispatch<SetStateAction<TActiveTab>>;
  children: React.ReactNode;
}

export const FunctionalSection: React.FC<FunctionalSectionProps> = ({
  dogsList,
  currentView,
  setCurrentView,
  children,
}) => {
  const handleActiveTab = (tab: TActiveTab) => {
    const nextView = tab === currentView ? "all" : tab;
    setCurrentView(nextView);
  };

  const favoritedDogsCount = dogsList["favorited"].length;
  const unfavoritedDogsCount = dogsList["unfavorited"].length;

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
            Favorited Dogs({favoritedDogsCount})
          </div>
          <div
            className={`selector ${
              currentView === "unfavorited" ? "active" : ""
            }`}
            onClick={() => handleActiveTab("unfavorited")}
          >
            Unfavorited Dogs({unfavoritedDogsCount})
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
      <div className="content-container">{children}</div>
    </section>
  );
};
