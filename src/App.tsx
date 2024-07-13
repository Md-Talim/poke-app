import { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import { getPokemonData, getPokemonDetails } from "./services/pokemonService";
import { Pokemon } from "./types/Pokemon";

const App = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonData();
      const detailedData = await Promise.all(
        data.map((pokemon: Pokemon) => getPokemonDetails(pokemon.url))
      );
      setPokemonList(detailedData);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <div className="pokemon-container">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
