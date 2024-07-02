import { ChangeEvent, Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

type ClassCreateDogFormState = {
  dogName: string;
  dogPicture: string;
  dogDescription: string;
};

type ClassCreateDogFormProps = {
  isLoading: boolean;
  createDog: (dogDate: Omit<Dog, "id">) => Promise<void>;
};

export class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  state: ClassCreateDogFormState = {
    dogName: "",
    dogPicture: Object.values(dogPictures)[0],
    dogDescription: "",
  };

  handleStatePropertyValue = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as Record<keyof ClassCreateDogFormState, string>);
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
      dogPicture: (dogPictures.BlueHeeler)
    });
  };
  render() {
    const { isLoading } = this.props;
    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          name="dogName"
          type="text"
          value={this.state.dogName}
          onChange={this.handleStatePropertyValue}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="dogDescription"
          id="dogDescription"
          cols={80}
          rows={10}
          value={this.state.dogDescription}
          onChange={this.handleStatePropertyValue}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          name="dogPicture"
          onChange={this.handleStatePropertyValue}
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
