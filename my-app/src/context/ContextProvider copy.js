import React,{ createContext, useContext, useState } from "react";

const ResultContext = createContext();

const BaseUrl = 'https://google-web-search1.p.rapidapi.com';
// const ApiKey = process.env.REACT_APP_API_KEY;
const ApiKey = "b6524ecf6bmsha7f6921dfb4e738p17e319jsnc191779b94e6;";

export const ResultContextProvider = ({children}) =>{
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // /videos /news /search /images
    const getResults = async(type) =>{
        setIsLoading(true);

        const response = await fetch(`${BaseUrl}${type}`, {
            method: 'GET',
            headers: {
                'x-user-agent': 'desktop',
                'x-proxy-location': 'US',
                'x-rapidapi-host': 'google-web-search1.p.rapidapi.com',
                'x-rapidapi-key': `${ApiKey}`,
            }
        });

        const data = await response.json();

        if(type.includes('/news')){
            setResults(data.entries);
        }
        else if(type.includes('/images')){
            setResults(data.image_results);
        }
        else{
            setResults(data.results);
        }
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }} >
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);
