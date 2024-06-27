import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP request failed! Status: ${res.status}`);
      }
      return res.json();
    }),

  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Omit<Dog, "id">) => {
    return fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP request failed! Status: ${res.status}`);
      }
      return res.json();
    });
  },

  // should delete a dog from the database
  deleteDog: (dogId: number) => {
    return fetch(`${baseUrl}/dogs/${dogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP request failed! Status: ${res.status}`);
      }
      return res.json();
    });
  },

  updateDog: (dogId: number, updatedDogData: Partial<Dog>) => {
    return fetch(`${baseUrl}/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDogData),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP request failed! Status: ${res.status}`);
      }
      return res.json();
    });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
