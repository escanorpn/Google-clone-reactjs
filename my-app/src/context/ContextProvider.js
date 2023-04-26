import React,{ createContext, useContext, useState } from "react";

const ResultContext = createContext();

const API_KEY="AIzaSyDxUvpOMZJs2tgvmOdboyB6PB1p_Nz31qU"

const CONTEXT_KEY = "61632587bd7f64859";

export const ResultContextProvider = ({children}) =>{
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // /videos /news /search /images
    const getResults = async(type) =>{
        console.log(type)
        const url = type;
const qIndex = url.indexOf("q="); // get the index of "q=" in the URL
const ampersandIndex = url.indexOf("&", qIndex); // get the index of "&" after "q=" in the URL
const qValue = url.substring(qIndex + 2, ampersandIndex); // extract the value of "q" from the URL
console.log(qValue); 
// const prioritySite="mbbch.com"

        setIsLoading(true);
        // const query=   `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${qValue}&siteSearch=${DOMAIN}`;
        const q="mbbch "+qValue;
        if(qValue="mbbch.com"){
q="mbbch.com";
        }
        const query=   `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${q}&sortby=gd`;
        console.log(query)

        const response = await fetch(query, {
            method: 'GET',
         
        });
        // const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=mbbch ${qValue}&sortby=gd`;
        // console.log(searchUrl)
        // const response = await fetch(searchUrl,{
        //     method: 'GET',
        // });
        // const mdata = await response.json();
  
        // // Extract search results from JSON response
        // const searchResults = mdata.items || [];
  
        // // Prioritize search results that match the priority site
        // const priorityResults = searchResults.filter(result => result.link.includes(prioritySite));
  
        // // Append remaining search results that don't match the priority site
        // const nonPriorityResults = searchResults.filter(result => !result.link.includes(prioritySite));
        // const sortedResults = priorityResults.concat(nonPriorityResults);
  

        const data = await response.json();
        // const data=sortedResults;
        console.log(data); 
        if(type.includes('/news')){
            // setResults(data.entries);
        }
        else if(type.includes('/images')){
            // setResults(data.image_results);
        }
        else{
         
            setResults(data.items);
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
