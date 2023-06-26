import styled from "styled-components"
import Link from 'next/link';

const HeaderWrapper = styled.div`
    width : 100%;
    height : 75px;
    background-color : #fff;
  

    & .bg-wrap{
        max-width : 1200px;
        margin : 0 auto;
        display : flex;
        justify-content : space-between;
        align-items : center;
    }

    & .logo-wrapper {
        height : 65px;
        width : 65px;

        img{
            height : 100%;
            width : 100%;
        }
    }

    & .link {
        text-decoration : none;
        color : #506690;
        cursor : pointer;
        font-size : 16px;
        font-weight : 500;
        font-family : 'Roboto', sans-serif;
            &:hover{
                color :#df2b20; 
                border-bottom : 2px solid #df2b20;
            }
    }
 

`

const Header = ()=>{
    return(
        <HeaderWrapper>
        <div className="bg-wrap">

            <div className="logo-wrapper">
                <img  src="	https://trxdomains.xyz/logo/logo_cic.png?v=3" alt="logo"/>
            </div>
            <div className="links">
            <Link href="" className="link">
                <p className="link">
                    Home
                </p>  
            </Link>
            
            </div>
        </div>
        </HeaderWrapper>
    )
}

export default Header