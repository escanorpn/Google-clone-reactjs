import React,{ useEffect } from 'react';
import { Wrapper,Content } from './results.style';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../../context/ContextProvider';
import Loader from '../Loader';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const Results = () => {

    const { results, isLoading, getResults, searchTerm } = useResultContext();
    console.log("m results:", results)
    const location = useLocation();

    useEffect(()=>{
        if(searchTerm){
            if(location.pathname === '/videos'){
                getResults(`/search/q=${searchTerm} videos`)
            }
            else{
                getResults(`${location.pathname}/q=${searchTerm}&num=40`);
            }
        }
    },[searchTerm, location.pathname]);

    if(isLoading){
        return <Loader/>
    }

    switch (location.pathname) {
        case '/search':
            return (
                <>
                <Wrapper>
                    {results?.map(({ link,title,snippet }, index) => (
                      
                        <Content key={index} className='search-results'>
                            <a href={link} rel='norefferrer' target='_blank' >
                                <p>
                                    {link.length > 30 ? link.substring(0,35) : link} &nbsp; <MoreVertIcon fontSize='small'/>
                                </p>
                                <p className='title' >
                                    {title}
                                </p>
                            </a>
                            {snippet !== null && (
                                <p className='desc'>
                                    {/* {snippet.length > 150 ? snippet.substring(0,150)+'...' : snippet} */}
                                {snippet}
                                </p>
                            )}
                        </Content>
                    ))}
                     {/* <div>
      {results?.map(obj => (
        <Content  className='search-results'>
        <a href={obj.link} rel='norefferrer' target='_blank' >
            <p>
                {obj.link.length > 30 ? obj.link.substring(0,35) : obj.link} &nbsp; <MoreVertIcon fontSize='small'/>
            </p>
            <p className='title' >
                {obj.title}
            </p>
        </a>
       
             {obj.snippet !== null && (
                  <p className='desc'>
                  {obj.snippet}
              </p>
             )}
          
    </Content>
      ))}
    </div> */}
                </Wrapper>
                </>
            )
        
        case '/images':
            return(
                <Wrapper>
                    <div className='image' >
                        { results.map(({ image , link,title}, index)=>(
                            <div>
                            {image !== undefined && (
                            <a href={image.contextLink} key={index} target='_blank' rel='noreferrer'>
                                <img src={image.thumbnailLink} alt={title} loading='lazy'/>
                                <p>
                                    {title}
                                </p>
                            </a>
                            )}
                            </div>
                        ))}
                    </div>
                </Wrapper>
            );
        
        case '/news':
            return(
                <Wrapper>
                    <div className='news'>
                        { results?.map(({ links,id,source,title }) => (
                            <div key={id} className='news-results'>
                                <a href={links?.[0].href} rel='norefferrer' target='_blank'>
                                    <p className='title' >
                                        {title}
                                    </p>
                                </a>
                                    <div className='link'>
                                        <a href={source?.href} target='_blank' className='hover:underline' rel='norefferrer'>
                                            {source?.href}
                                        </a>
                                    </div>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            );
        
        case '/videos':
            return(
                <Wrapper>
                    <div className='videos'>
                        {results.map((video,index)=>(
                            <div key={index} className='video-results'>
                                <ReactPlayer url={video.additional_links?.[0].href} controls width='340px' height='200px' />
                            </div>
                        ))}
                    </div>
                </Wrapper>
            );
        
        default:
            return 'ERROR!';
    }

};

export default Results;