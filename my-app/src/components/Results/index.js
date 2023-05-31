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

// import pData from "../../data/data.json";

import blausenImage from '../../img/blausen.jpg';
import logoImage from '../../img/banner.jpg';
import sitegroundImage from '../../img/siteground.jpg';
import pandemicImage from '../../img/youtube.jpg';

import Avatar from '@mui/material/Avatar';

const pData = [
   
    {
      Title: "Logo",
      description: "",
      url: logoImage,
      link: "https://www.leadnicely.com/logo-questionnaire/"
    },
    {
      Title: "Siteground",
      description: "",
      url: sitegroundImage,
      link: "https://siteground.com/web-hosting.htm?afimagecode=5e9f001b10f773e5af881b6bb8e5993c"
    },
    {
        Title: "Blausen",
        description: "",
        url: blausenImage,
        link: "https://www.amazon.com/dp/0578389045"
      },
    {
      Title: "Pandemic story",
      description: "",
      url: pandemicImage,
      link: "https://www.youtube.com/watch?v=hQsS7rStdzA"
    }
  ];


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
     const  pfirst=(arr) =>{
         if(!Array.isArray(arr)) return;
         return arr[0].image;
      }
      const  afirst=(arr) =>{
          if(!Array.isArray(arr)) return;
          return arr[0];
       }
    const { results,results1, isLoading, getResults, searchTerm } = useResultContext();
    // console.log("m results:",results)
    console.log("m results1:",JSON.stringify(results1))
   
   
    let mItems="";
    if(JSON.stringify(results1) !== "[]" && results1!=undefined){
     mItems=  
    results1.slice(0, 3).map((a)=>{
        return (
            <>
       
        <Grid item xs={12} sm={6} md={4} lg={3} style={{maxWidth:"95%"}}  >
            <Item  >
            <Card className='mCard' >
            <CardActionArea>
    
            {a.pagemap!==undefined && first(a.pagemap.cse_thumbnail)!==undefined && (
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
           
             {a.pagemap!==undefined && a.pagemap.person!==undefined && pfirst(a.pagemap.person)!==undefined  && (
                <>
                        <Avatar
            src={pfirst(a.pagemap.person)}
            style={{marginBottom:"-32px",marginTop:"12px"}}
            />
            </>
            )}
            {a.pagemap!==undefined && a.pagemap.person!==undefined && afirst(a.pagemap.metatags)!==undefined  && (
                            <>
            <Typography variant="body2" color="text.secondary">
                    <b>{afirst(a.pagemap.metatags).author}</b> 
                        </Typography>
            </>
            )}

            </CardContent>
            </CardActionArea>
            </Card>
            </Item>
            </Grid>         
    </>
    )});
            }

   const pItems=  pData.map((a,index)=>{
     
       return (
       <Grid item xs={12} sm={6} md={4} lg={3} style={{maxWidth:"95%"}} key={index} >
       <Item >
       <a href={a.link} rel='norefferrer' target='_blank' >
<Card sx={{ maxWidth: 295 }} >
<CardActionArea>
   
{a.url!==undefined && (
    
<CardMedia

component="img"
//   height="140"
image= {a.url}
alt=  {a.Title}
/>)} 
{/* <img src={a.url} alt={a.Title} /> */}
<CardContent>
{/* <Typography gutterBottom variant="h6" component="div">
<a href={a.link} rel='norefferrer' target='_blank' >
{a.Title}
</a>
</Typography> */}
{/* {a.description !== null && (
<Typography variant="body2" color="text.secondary">
   {a.description}
</Typography>
)} */}
{/* <a href={a.link} rel='norefferrer' target='_blank' >
        <p className='title' >
           more
        </p>
    </a> */}
</CardContent>
</CardActionArea>
</Card>
</a>
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
    
     listItems = results.map((a)=>{
        return (
            <>
       
        <Grid item xs={12} sm={6} md={4} lg={3} style={{maxWidth:"95%"}}  >
            <Item >
            <Card className='mCard' >
            <CardActionArea>
    
            {a.pagemap!==undefined && first(a.pagemap.cse_thumbnail)!==undefined && (
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
            {a.pagemap!==undefined && a.pagemap.person!==undefined && pfirst(a.pagemap.person)!==undefined  && (
                <>
                        <Avatar
            src={pfirst(a.pagemap.person)}
            style={{marginBottom:"-32px",marginTop:"12px"}}
            />
            </>
            )}
            {a.pagemap!==undefined && a.pagemap.person!==undefined && afirst(a.pagemap.metatags)!==undefined  && (
                            <>
            <Typography variant="body2" color="text.secondary">
                    <b>{afirst(a.pagemap.metatags).author}</b> 
                        </Typography>
            </>
            )}
            </CardContent>
            </CardActionArea>
            </Card>
            </Item>
            </Grid>         
    </>
    )});
    
}
let listItems1="";
if(JSON.stringify(results1) !== "[]" && results1!=undefined){
     listItems1 = results1.slice(3).map((a)=>{

        return (
        <Grid item xs={12} sm={6} md={4} lg={3}style={{maxWidth:"95%"}}  >
                <Item >
        <Card className='mCard' >
<CardActionArea >
    
{a.pagemap!==undefined && first(a.pagemap.cse_thumbnail)!==undefined &&  (
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
     {a.pagemap!==undefined && a.pagemap.person!==undefined && pfirst(a.pagemap.person)!==undefined  && (
                <>
                        <Avatar
            src={pfirst(a.pagemap.person)}
            style={{marginBottom:"-32px",marginTop:"12px"}}
            />
            </>
            )}
            {a.pagemap!==undefined && a.pagemap.person!==undefined && afirst(a.pagemap.metatags)!==undefined  && (
                            <>
            <Typography variant="body2" color="text.secondary">
                    <b>{afirst(a.pagemap.metatags).author}</b> 
                        </Typography>
            </>
            )}
</CardContent>
</CardActionArea>
</Card>
</Item>
</Grid>
   )});
        }
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
          
                <Box sx={{ flexGrow: 1 }} style={{backgroundColor:"#E7EBF0",maxWidth:"1200px",marginLeft:"auto",marginRight:"auto",marginTop:"80px", zIndex: "3",position: "relative"}}>
               
                  <Grid container spacing={1} style={{ alignItems: "flex-start",marginLeft:"auto",marginRight:"auto"}}>
            
                  {JSON.stringify(results1) !== "[]" && (
                        <>
                       {mItems}
                        </>
                  )}
                  {JSON.stringify(results) !== "[]" && (
                        <>
                        {pItems}
                        {listItems1}
                        </>
                  )}
                 
                        {listItems}
               
                
                       
                  
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