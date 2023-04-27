import React from 'react';
import { Wrapper } from './searchpage.style';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Center from '../components/home-center';
import Links from '../components/Links';
import Results from '../components/Results';

import { useResultContext } from '../context/ContextProvider';

const SearchPage = () => {

  const { searchTerm } = useResultContext();

  document.title = `${searchTerm} - Google Search `;

  return (
     <Wrapper>
       <div className='white'>
        <div className='logo'>
            <Link to='/'>
            <img src={require('../img/2.png')}alt='logo'/>  </Link>
        </div>
        <Navbar hide/>
        <Center hideBtns fixed />
        <Links/>
        </div>
        <Results/>
     </Wrapper>
  )
};

export default SearchPage;
