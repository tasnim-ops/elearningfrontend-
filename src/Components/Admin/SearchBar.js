import React, { useState } from 'react'
import { useEffect } from 'react';
const SearchBar = ({ entityClass,  onSearchChange }) => {
    const [input, setInput] = useState('');
    
   



  return (
    <div>
      <input
        type="text"
        placeholder={`Rechercher ${entityClass}...`}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar