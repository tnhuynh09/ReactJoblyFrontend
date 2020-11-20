import React, { useState } from "react";
import "./Search.css";

function Search({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault();
        handleSearch(searchTerm);
    }

    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className="Search">
            <form className="Search-form"
                onSubmit={handleSubmit}>
                <input
                    name="searchTerm"
                    type="text"
                    placeholder="Enter search term.."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Search;
