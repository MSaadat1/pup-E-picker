import { ChangeEvent, Component } from "react";
import { dogPictures } from "../dog-pictures";
import { AppState } from "./ClassApp";

interface classCreateDogFormState {
  dogName: string;
  dogPicture: string;
  dogDescription: string;
}

export class ClassCreateDogForm extends Component<
  AppState,
  classCreateDogFormState
> {
  state: classCreateDogFormState = {
    dogName: "",
    dogPicture: Object.values(dogPictures)[0],
    dogDescription: "",
  };
  handleDogNameChange = (even: ChangeEvent<HTMLInputElement>) => {
    this.setState({ dogName: even.target.value });
  };
  handleDogPicture = (even: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ dogPicture: even.target.value });
  };
  handleDogDescription = (even: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ dogDescription: even.target.value });
  };
  handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { createDog } = this.props;
    const { dogName, dogPicture, dogDescription } = this.state;
    createDog({
      name: dogName,
      image: dogPicture,
      description: dogDescription,
      isFavorite: false,
    });
  };
  render() {
    //const { createDog } = this.props;
    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={this.state.dogName}
          onChange={this.handleDogNameChange}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={this.handleDogDescription}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={this.handleDogPicture}
          disabled={false}
          value={this.state.dogPicture}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
