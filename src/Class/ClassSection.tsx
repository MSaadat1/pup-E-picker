// you can use `ReactNode` to add a type to the children prop
import { Component, Dispatch } from "react";
import { Link } from "react-router-dom";
import { Dog } from "../types";
import { TActiveTab } from "./ClassApp";

interface ClassSectionProps {
  dogsList: Record<TActiveTab, Dog[]>;
  currentView: TActiveTab;
  setCurrentView: Dispatch<TActiveTab>;
  children: React.ReactNode;
}

export class ClassSection extends Component<ClassSectionProps> {
  handleActiveTab = (tab: TActiveTab) => {
    const nextView = tab === this.props.currentView ? "all" : tab;
    this.props.setCurrentView(nextView);
  };

  render() {
    const { currentView, children, dogsList } = this.props;
    const favoritedDogsCount = dogsList["favorited"].length;
    const unfavoriteDogsCount = dogsList["unfavorited"].length;

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
              favorited ( {favoritedDogsCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                currentView === "unfavorited" ? "active" : ""
              }`}
              onClick={() => this.handleActiveTab("unfavorited")}
            >
              unfavorited ({unfavoriteDogsCount} )
            </div>
            <div
              className={`selector  ${
                currentView === "createDog" ? "active" : ""
              }`}
              onClick={() => this.handleActiveTab("createDog")}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
