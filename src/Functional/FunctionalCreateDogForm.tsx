import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  isLoading,
  createDog,
}: {
  isLoading: boolean;
  createDog: (dogs: Omit<Dog, "id">) => void;
}) => {
  const [dogName, setDogName] = useState("");
  const [dogPicture, setDogPicture] = useState(defaultSelectedImage);
  const [dogDescription, setDogDescription] = useState("");

  const reset: () => void = () => {
    setDogName("");
    setDogDescription("");
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        createDog({
          name: dogName,
          image: dogPicture,
          description: dogDescription,
          isFavorite: false,
        });
        reset();
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        value={dogName}
        onChange={(e) => {
          setDogName(e.target.value);
        }}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        value={dogDescription}
        onChange={(e) => {
          setDogDescription(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        value={dogPicture}
        disabled={isLoading}
        onChange={(e) => {
          setDogPicture(e.target.value);
        }}
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
};
