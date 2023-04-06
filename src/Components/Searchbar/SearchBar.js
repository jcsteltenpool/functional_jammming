import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar ({ onSearch }) {
    const [term, setTerm] = useState('');

    const search = () => onSearch(term);

    const handleTermChange = ({ target }) => setTerm(target.value);

    return (
        <div className="SearchBar">
                <input onChange={handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button onClick={search} className="SearchButton">SEARCH</button>
        </div>
    )
}