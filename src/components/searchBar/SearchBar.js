import React, {useState} from 'react';
import './SearchBar.css';


function SearchBar({setLocationHandler}) {
    const [query, setQuery] = useState('')
    function onFormSumbit(e) {
        e.preventDefault();
        setLocationHandler(query);
    }

    return (
    <form className="searchbar" onSubmit={onFormSumbit}>
      <input
        type="text"
        name="search"
        placeholder="Zoek een stad in Nederland"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">
        Zoek
      </button>
    </form>
  );
}

export default SearchBar;
