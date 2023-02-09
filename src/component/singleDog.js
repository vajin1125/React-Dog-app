import React, { useState, useEffect } from "react"
import { trackPromise } from 'react-promise-tracker';
import apikey from "../api";
import { LoadingIndicator } from "../component/spinner";

export const SingleDog = props => {
  const [dog, setDog] = useState([])
  const name = props.signDog

  const handleSingleModal = () => {
    setDog([])
    props.handleModal();
  }

  useEffect(() => {
    const fetchSingleDogData = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
            headers: apikey.headers
          }
        )
        const data = await res.json()
        setDog(data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    trackPromise(fetchSingleDogData())
  }, [name])

  return (
    <>
      {/* Reac modal with tailwind */}
      {props.showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="bg-slate-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    { name }
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleSingleModal()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div>
                  <LoadingIndicator />
                </div>
                {dog.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center"
                    >
                      <article>
                        <img
                          src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                          alt={item.name}
                          loading="lazy"
                          className="rounded-xl"
                        />
                      </article>
                      <article>
                        {/* <h1 className="text-3xl font-bold text-white mb-8 lg:text-5xl">
                          {item.name}
                        </h1> */}
                        {item.description && (
                          <p className="text-slate-400 mb-8 text-sm lg:text-base leading-loose lg:leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        <ul className="text-sm text-slate-400 leading-loose lg:text-base lg:leading-relaxed">
                          <li>
                            <span className="font-bold text-slate-200">Bred For:</span>{" "}
                            {item.bred_for}
                          </li>
                          <li>
                            <span className="font-bold text-slate-200">Height:</span>{" "}
                            {item.height.metric} cm
                          </li>
                          <li>
                            <span className="font-bold text-slate-200">Weight:</span>{" "}
                            {item.weight.metric} kgs
                          </li>
                          <li>
                            <span className="font-bold text-slate-200">Breed Group:</span>{" "}
                            {item.breed_group}
                          </li>
                          <li>
                            <span className="font-bold text-slate-200">Lifespan:</span>{" "}
                            {item.life_span}
                          </li>
                          <li>
                            <span className="font-bold text-slate-200">Temperament:</span>{" "}
                            {item.temperament}
                          </li>
                        </ul>
                      </article>
                    </div>
                ))}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleSingleModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
