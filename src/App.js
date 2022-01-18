import "./App.css";
import {
  useGetAllPokemonsQuery,
  useGetPokemonByNameQuery,
} from "./services/pokemon";
import { useState } from "react";

function App() {
  const [queryPokemon, setQueryPokemon] = useState(null);
  const { data, isLoading } = useGetAllPokemonsQuery();
  const { currentData } = useGetPokemonByNameQuery(queryPokemon, {
    skip: !queryPokemon,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <header>
        <h1>Choose your favorite Pokemon and check their attributes</h1>
        <p>This app use RTK query</p>
      </header>
      {data && (
        <div className="App">
          {data.results.map((result, i) => (
            <div
              key={i}
              className="pokemonCard"
              data-isSelected={queryPokemon === result.name}
              onClick={() => {
                setQueryPokemon(result.name);
              }}
            >
              <h2>
                {result.name.substring(1, -1).toUpperCase() +
                  result.name.substring(1)}
              </h2>
            </div>
          ))}
        </div>
      )}
      {queryPokemon && currentData && (
        <div className="box">
          <div>
            <h2>
              {currentData.name.substring(1, -1).toUpperCase() +
                currentData.name.substring(1)}
            </h2>
            {currentData.weight && <p>Waga: {currentData.weight}</p>}
            {currentData.height && <p>Wzrost: {currentData.height}</p>}
          </div>
          {currentData.sprites.front_default && (
            <img
              className="image"
              src={currentData.sprites.front_default}
              alt=""
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
