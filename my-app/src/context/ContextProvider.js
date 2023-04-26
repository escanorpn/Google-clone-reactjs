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

const substrings = type.split('/');
const cType = substrings[1];
let st=""
if(cType=="images"){
st="&searchType=image"
}
console.log(cType);

// const prioritySite="mbbch.com"

        setIsLoading(true);
        // const query=   `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${qValue}&siteSearch=${DOMAIN}`;
        let q="mbbch "+qValue;
        if(qValue=="mbbch.com"){
q="mbbch.com";
        }
        const query= `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${q}&sortby=gd${st}`;
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
        const rItems=data.items;
        // const fData = rItems.filter((item) => item.link.startsWith('https://mbbch.com/'));
        const fData = rItems.sort((a, b) => {
            if (a.link.startsWith('https://mbbch.com/') && !b.link.startsWith('https://mbbch.com/')) {
              return -1;
            } else if (!a.link.startsWith('https://mbbch.com/') && b.link.startsWith('https://mbbch.com/')) {
              return 1;
            } else {
              return a.link.localeCompare(b.link);
            }
          });
          
       

        // const data=sortedResults;
        console.log("data: "+rItems); 
        console.log("fData: "+fData); 
        if(type.includes('/news')){
            // setResults(data.entries);
        }
        else if(type.includes('/images')){
            // setResults(data.image_results);
        }
        else{
         
            setResults(fData);
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
