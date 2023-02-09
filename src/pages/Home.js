import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { trackPromise } from 'react-promise-tracker';
import apikey from "../api";
import { LoadingIndicator } from "../component/spinner";
import { SingleDog } from "../component/singleDog";
import { DogCard } from "../component/dogCard";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [signDog, setSignDog] = useState();
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch("https://api.thedogapi.com/v1/breeds", {
          headers: apikey.headers
        });
        const data = await res.json();
        setDogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    setSearched(false);
    trackPromise(fetchDogData());
  }, []);

  const searchForDog = async () => {
    if (text) {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${text}`, {
            headers: apikey.headers
          }
        );
        const data = await res.json();
        setDogs(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // alert("Search for the Dog you want in the search bar");
      try {
        const res = await fetch(`https://api.thedogapi.com/v1/breeds/`);
        const data = await res.json();
        setDogs(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    trackPromise(searchForDog());
    setSearched(true);
  };

  const handleModal = (name) => {
    setShowModal(!showModal);
    setSignDog(name);
  }
 
  return (
    <>
      <section className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="md:w-[80px] w-[40px]">
            <img
              src="https://homesfeed.com/wp-content/uploads/2015/04/dog-house-with-one-vision-made-from-wood-planks.jpg"
              alt="logo"
              className="w-[100%] rounded-full"
            />
          </div>
          <div>
            {isAuthenticated && (
              <p className="py-1 md:py-2 px-1 md:px-4 bg-blue-900 text-white rounded">
                {" "}
                {user.name}{" "}
              </p>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="py-1 md:py-2 px-1 md:px-4  bg-blue-900 text-white rounded"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="py-2 px-4 bg-blue-900 text-white rounded"
              >
                Log In
              </button>
            )}
          </div>
        </div>

        <div className="text-center">
          <h1 className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl text-white">
            💖I Love the Dogs💖
          </h1>
          <p className="my-8 text-white">
            This application is powered by{" "}
            <a
              href="https://thedogapi.com"
              className="text-indigo-600 underline active:text-orange-400"
            >
              The Dog Api
            </a>
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex items-center"
            autoComplete="off"
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Text"
              className="py-2 px-4 rounded shadow w-full bg-slate-400 text-white placeholder-white"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-900 text-white rounded"
            >
              Search
            </button>
          </form>
        </div>
        
        <div>
          <LoadingIndicator />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 my-10 lg:my-20f">
          {!searched ? (
            dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} handleModal={handleModal} />
            ))
          ) : (
            <>
              {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} handleModal={handleModal} searched={searched}/>
              ))}
            </>
          )}
        </div>
      </section>
      <SingleDog signDog={signDog} showModal={showModal} handleModal={handleModal} />
    </>
  )}
