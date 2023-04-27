import { Wrapper } from "./logo.style";

const Logo = () =>(
    <Wrapper>
        <div className='logo' >
          {/* <img src='https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg' alt='logo'/> */}
     
          <img src={require('../../img/2.png')}alt='logo'/>
      </div>
    </Wrapper>
)

export default Logo;