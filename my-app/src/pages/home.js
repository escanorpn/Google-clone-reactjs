import React from 'react';
import Center from '../components/home-center';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import img from "../img/c.jpg"

export const Home = () => {

  document.title='MBBCH'
  return (
    
      <div>
      
        <div style={{backgroundImage: `url(${img})`,
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    position: "relative",
    backgroundSize: "cover",
    height:'100vh',
    boxShadow:"rgba(0, 0, 0, 0.57) 0px 0px 0px 6000px inset"
}}>
     <Logo />
 

        {/* <img src={require('../img/b.png')}alt='bg'/> */}
        <Center/>
        
      </div>
      </div>
  )
};

export default Home;