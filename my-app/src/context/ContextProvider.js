import React,{ createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

const ResultContext = createContext();

const API_KEY="AIzaSyDxUvpOMZJs2tgvmOdboyB6PB1p_Nz31qU"
// "AIzaSyBq3DPHay8IE36SPYghDlXuXxcG1GiFtl8"

const CONTEXT_KEY = "61632587bd7f64859";

export const ResultContextProvider = ({children}) =>{
  const [results, setResults] = useState([]);
  const [results1, setResults1] = useState([]);
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
        
        let q=qValue;
        if(qValue==="mbbch.com"){
            q="mbbch.com";
        }else if(qValue==="mbbch"){
            q="mbbch.com";
        }

        const substrings = type.split('/');
        const cType = substrings[1];
        let st=""
        if(cType==="images"){
        st="&searchType=image"
        }
        console.log(cType);
        // &siteSearch=${domain}
        // const prioritySite="mbbch.com"

        setIsLoading(true);
        const query= `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${q}&sortby=gd${st}`;
        const query1= `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${q}&sortby=gd${st}&siteSearch=mbbch.com`;
        // console.log(query)
        const options={
            method: 'GET',
        }
        toast('Here is your toast.');
        try {
          const response1 = await fetch(query1, options);
          const response = await fetch(query, options);
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          if (!response1.ok) {
            throw new Error(response1.statusText);
          }
          const data1 = await response1.json();
          const data = await response.json();
          const rItems1=data1.items;
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

              setResults(fData);
              setResults1(rItems1);
            // handle successful response
          } catch (error) {
            setIsLoading(false);
            // setErrorMessage(error.message);
            toast.error(error.message);
          }
        
      
       

        // const response = await fetch(query, options);

        // const data = await response.json();
        // const rItems=data.items;
        // // const fData = rItems.filter((item) => item.link.startsWith('https://mbbch.com/'));
        // const fData = rItems.sort((a, b) => {
        //     if (a.link.startsWith('https://mbbch.com/') && !b.link.startsWith('https://mbbch.com/')) {
        //       return -1;
        //     } else if (!a.link.startsWith('https://mbbch.com/') && b.link.startsWith('https://mbbch.com/')) {
        //       return 1;
        //     } else {
        //       return a.link.localeCompare(b.link);
        //     }
        //   });
          
       

        // // const data=sortedResults;
        // console.log("data: "+JSON.stringify(rItems)); 
        // console.log("fData: "+JSON.stringify(fData)); 
        // if(type.includes('/news')){
        //     // setResults(data.entries);
        // }
        // else if(type.includes('/images')){
        //     // setResults(data.image_results);
        //     setResults(fData);
        // }
        // else{
         
        //     setResults(fData);
        // }
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{ getResults, results,results1, searchTerm, setSearchTerm, isLoading }} >
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);
