import { ChangeEvent, Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

interface ClassCreateDogFormState {
  dogName: string;
  dogPicture: string;
  dogDescription: string;
}

interface ClassCreateDogFormProps {
  isLoading: boolean;
  createDog: (dogDate: Omit<Dog, "id">) => Promise<void>;
}

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  state: ClassCreateDogFormState = {
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
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { createDog } = this.props;
    const { dogName, dogPicture, dogDescription } = this.state;
    createDog({
      name: dogName,
      image: dogPicture,
      description: dogDescription,
      isFavorite: false,
    });
    this.reset();
  };
  reset: () => void = () => {
    this.setState({
      dogName: "",
      dogDescription: "",
    });
  };
  render() {
    const { isLoading } = this.props;
    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={this.state.dogName}
          onChange={this.handleDogNameChange}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          value={this.state.dogDescription}
          onChange={this.handleDogDescription}
          disabled={isLoading}
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
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
