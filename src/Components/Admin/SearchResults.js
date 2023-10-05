import React from "react";

const SearchResults = ({ results }) => {
  if (results.length === 0) {
    return null; // Rien à afficher si la liste des résultats est vide
  }

  return (
    <div className="scroll-container">
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.firstname} {result.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
