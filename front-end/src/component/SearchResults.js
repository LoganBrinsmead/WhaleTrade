import { useEffect, useState } from 'react';

import { getStockLookup } from '../services/api/whaletradApi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function SearchResults(props) {
    const { search_query } = props;

    const location = useLocation();

    const [ searchResults, setSearchResults ] = useState([]);
    

    useEffect(() => {
        getStockLookup(search_query)
        .then(( res => {
            console.log(res.data);
            setSearchResults(res.data.result);
        }).catch( err => {
            console.log(err);
        }));
    }, [search_query])

    return (
        <ul>
            {searchResults.map((result) => (
                <li>{result.description} - {result.displaySymbol}</li>
            ))}
        </ul>
    );
}
