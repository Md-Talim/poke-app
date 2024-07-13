import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard";
import { getPokemonData, getPokemonDetails } from "./services/pokemonService";
import { Pokemon } from "./types/Pokemon";

const App = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémons by name"
        value={search}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
