import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pokemon from "./Pokemon";
import Pokedex from "./Pokedex";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Pokedex />} />
        <Route path=":Poke-Dex" element={<Pokedex />} />
        <Route path=":pokemonId" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
