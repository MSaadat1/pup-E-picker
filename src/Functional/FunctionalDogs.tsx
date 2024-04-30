//import { DogCard } from "../Shared/DogCard";
//import { dogPictures } from "../dog-pictures";
//import { Dog } from "../types";
import "../App.css";
import { ReactNode } from "react";
//import { Children, ReactNode } from "react";
//import { TrashButton } from "../Shared/TrashButton";
//import { FavoriteButton } from "../Shared/FavoriteButton";
//import { divide } from "lodash-es";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({ children }: { children: ReactNode }) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {children}

      {/* <DogCard
        // dog={{
        //   id: 1,
        //   image: dogPictures.BlueHeeler,
        //   description: "Example Description",
        //   isFavorite: false,
        //   name: "Cute Blue Heeler",
        // }}
        // key={1}
        // onTrashIconClick={() => {
        //   alert("clicked trash");
        // }}
        // onHeartClick={() => {
        //   alert("clicked heart");
        // }}
        // onEmptyHeartClick={() => {
        //   alert("clicked empty heart");
        // }}
        // isLoading={false}
      /> */}
      {/* <DogCard
        dog={{
          id: 2,
          image: dogPictures.Boxer,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Boxer",
        }}
        key={2}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      />
      <DogCard
        dog={{
          id: 3,
          image: dogPictures.Chihuahua,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Chihuahua",
        }}
        key={3}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      />
      <DogCard
        dog={{
          id: 4,
          image: dogPictures.Corgi,
          description: "Example Description",
          isFavorite: false,
          name: "Cute Corgi",
        }}
        key={4}
        onTrashIconClick={() => {
          alert("clicked trash");
        }}
        onHeartClick={() => {
          alert("clicked heart");
        }}
        onEmptyHeartClick={() => {
          alert("clicked empty heart");
        }}
        isLoading={false}
      /> */}
    </>
  );
};
