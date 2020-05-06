import React from 'react';
import './SearchBlock.css';

const SearchBlock = () => {

    const SearchBlockText = 'What are you wont to search';
    return (
        <div className="search-block">
            <input placeholder={SearchBlockText} />
        </div>

    );
}

export default SearchBlock;  