import React,{ useEffect } from 'react';
import { Wrapper,Content } from './results.style';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../../context/ContextProvider';
import Loader from '../Loader';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import pData from "../../data/data.json"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff0',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    boxShadow:"none",
    width:"99%",
    color: theme.palette.text.secondary,
  }));

const Results = () => {
    const  first=(arr) =>{
        if(!Array.isArray(arr)) return;
        return arr[0].src;
     }
    const { results, isLoading, getResults, searchTerm } = useResultContext();
    // console.log("m results:",typeof results,first(results).pagemap.cse_thumbnail[0].src)
    const pItems=  pData.map((a)=>{
      
        return (
        <Grid item xs="auto" style={{maxWidth:"95%"}}  >
        <Item >
<Card sx={{ maxWidth: 295 }} >
<CardActionArea>
    
{a.url!==undefined && (
<CardMedia

component="img"
//   height="140"
image=  {a.url}
alt=  {a.Title}
/>)} 
<CardContent>
<Typography gutterBottom variant="h6" component="div">
<a href={a.link} rel='norefferrer' target='_blank' >
{a.Title}
</a>
</Typography>
{a.description !== null && (
<Typography variant="body2" color="text.secondary">
    {a.description}
</Typography>
)}
<a href={a.link} rel='norefferrer' target='_blank' >
         <p className='title' >
            more
         </p>
     </a>
</CardContent>
</CardActionArea>
</Card>
</Item>
</Grid>
   )});
   let listItems="nnn";
   if(JSON.stringify(results) == "[]" ){

    console.log("listItems: "+JSON.stringify(listItems), typeof listItems)
    listItems = 
            <>
            <Typography variant="body2" color="text.secondary">
            Your search did not match any documents.
            <br/>
            <h5>Suggestions:</h5>
<ul>
    <li>Make sure that all words are spelled correctly.</li>
    <li>Try different keywords.</li>
    <li>Try more general keywords.</li>
    <li>Try fewer keywords.</li>
</ul>






            </Typography>
    </>
}else{
    
     listItems = results.slice(0, 3).map((a)=>{
        return (
            <>
       
        <Grid item xs="auto"  style={{maxWidth:"95%"}}  >
            <Item >
            <Card sx={{ maxWidth: 345 }} >
            <CardActionArea>
    
            {first(a.pagemap.cse_thumbnail)!==undefined && (
            <CardMedia
            // style={{maxWidth:"200px"}}
            component="img"
            image=  {first(a.pagemap.cse_thumbnail)}
            alt=  {a.title}
            />)} 
            <CardContent>
            <Typography gutterBottom variant="h6" component="div">
            <a href={a.link} rel='norefferrer' target='_blank' >
            {a.title}
            </a>
            </Typography>
            {a.snippet !== null && (
            <Typography variant="body2" color="text.secondary">
            {a.snippet}
            </Typography>
            )}
            <a href={a.link} rel='norefferrer' target='_blank' >
            </a>
            </CardContent>
            </CardActionArea>
            </Card>
            </Item>
            </Grid>         
    </>
    )});
    
}
  
    const listItems1 = results.slice(3).map((a)=>{

        return (
        <Grid item xs="auto" style={{maxWidth:"95%"}}  >
                <Item >
        <Card sx={{ maxWidth: 345 }} >
<CardActionArea >
    
{first(a.pagemap.cse_thumbnail)!==undefined && (
<CardMedia
// style={{maxHeight:"200px"}}
component="img"
//   height="140"
image=  {first(a.pagemap.cse_thumbnail)}
alt=  {a.title}
/>)} 
<CardContent >
<Typography gutterBottom variant="h6" component="div">
<a href={a.link} rel='norefferrer' target='_blank' >
    123
{a.title}
</a>
</Typography>
{a.snippet !== null && (
<Typography variant="body2" color="text.secondary">
    {a.snippet}
{/* {JSON.stringify(first(pagemap.cse_thumbnail))} */}
</Typography>
)}
<a href={a.link} rel='norefferrer' target='_blank' >
         
         {/* <p className='title' >
            more
         </p> */}
     </a>
</CardContent>
</CardActionArea>
</Card>
</Item>
</Grid>
   )});
  
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
                {/* <Wrapper>
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
                                {snippet}
                                </p>
                            )}
                        </Content>
                    ))}
                    
                </Wrapper> */}
          
                <Box sx={{ flexGrow: 1 }} style={{backgroundColor:"#E7EBF0",width:"98%",maxWidth:"1200px",marginLeft:"auto",marginRight:"auto",marginTop:"95px",}}>
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{marginLeft:"auto",marginRight:"auto"}} >
                {/* */}
                {/* {results?.map(({ link,title,snippet,pagemap }, index) => (
                      
                         <Grid item xs={2} sm={8} md={4} key={index} >
                             <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      {first(pagemap.cse_thumbnail) !== null && (
        <CardMedia
          component="img"
        //   height="140"
          image=  {first(pagemap.cse_thumbnail)}
          alt=  {title}
        />)} 
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
          {title}
          </Typography>
          {snippet !== null && (
          <Typography variant="body2" color="text.secondary">
   {JSON.stringify(first(pagemap.cse_thumbnail))}
          </Typography>
              )}
                 <a href={link} rel='norefferrer' target='_blank' >
                              
                              <p className='title' >
                                 more
                              </p>
                          </a>
        </CardContent>
      </CardActionArea>
    </Card>
                    
                         </Grid>
                        
                    
                  ))} */}
                  </Grid>
                  <Grid container spacing={1} style={{ alignItems: "flex-start",marginLeft:"auto",marginRight:"auto"}}>
                  {listItems}
                        {pItems}
                        {listItems1}
                  
  {/* <Grid item xs="auto">
    <Item>variable width content</Item>
  </Grid>
  <Grid item xs={6}>
    <Item>xs=6</Item>
  </Grid>
  <Grid item xs>
    <Item>xs</Item>
  </Grid> */}
</Grid>
      
      </Box>
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