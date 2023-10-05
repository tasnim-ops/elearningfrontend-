import React from "react";
import "./DashBoard.css";
const SearchResultList = ({ results }) => {
  return (
    <div className="result-list">
      {results.map((result, id) => {
        return (
          <div key={id}>
            {result.firstname} {result.lastname}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultList;
