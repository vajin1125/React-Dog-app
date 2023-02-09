import React from "react";
import { Link } from "react-router-dom";

export const DogCard = props => {

  return(
    <>
      <Link
        // to={`/${dog.name}`}
        key={props.dog.id}
        className="bg-slate-700 p-4 rounded transition-all duration-200"
        onClick={() => props.handleModal(props.dog.name)}
      >
        <div className="overflow-hidden">
          <img
            src={ props.searched ? `https://cdn2.thedogapi.com/images/${props.dog.reference_image_id}.jpg` : props.dog.image.url}
            alt={props.dog.name}
            loading="lazy"
            className="md:h-72 w-full object-cover hover:scale-110 transition duration-300 ease-in-out"
          />
        </div>
        <h3 className="text-slate-200 text-lg font-bold mt-4">
          {props.dog.name}
        </h3>
        <p className="text-slate-200">Bred For: {props.dog.bred_for}</p>
      </Link>
    </>
  )
}