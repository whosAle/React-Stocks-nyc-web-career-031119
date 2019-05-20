import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="alphabetically" checked={props.sort === "alphabetically"} onChange={(e) => props.onSearchClick(e, e.target.value)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="price" checked={props.sort === "price"} onChange={(e) => props.onSearchClick(e, e.target.value)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(e) => props.onFilterSelect(e.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
