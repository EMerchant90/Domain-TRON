import styled from "styled-components"
import Link from 'next/link';
import { ClipBoardIcon, ExitIcon, Logo } from 'components/Icons'
import { useState } from "react";

const HeaderWrapper = styled.div`
    width : 100%;
    background-color : rgb(241,243,243);
  

    & .bg-wrap{
        margin : 0 50px;
        padding-top : 32px;
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

    & .wallet-button{
        background-color:  rgb(56, 136, 255);
        height: 50px;
        min-width: 180px;
        justify-content: center;
        padding: 5px 16px;
        font-family: Poppins;
        color: #fff;
        border-radius: 30px;
        border: 2px solid transparent;
        font-weight: 700;
        font-size: 16px;
        width: fit-content;
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    
        & span{
        filter: brightness(1);
        }
        & img {
          margin-right: 10px;
          filter: brightness(1);
        }
      
        &:hover {
            opacity: 0.9;
        }
      
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0;
          background: linear-gradient(rgb(56, 136, 255), transparent);
          transition: height 0.3s ease-in-out;
        }
      
        &:hover::before {
          height: 100%;
        }
    
        & .icon-wrapper{
          margin: 0 5px;
        }
    
        &:hover{
          & .icon-wrapper{
            & svg{
              transition:  0.3s ease-in-out;
              filter: brightness(0) saturate(100%) invert(100%) sepia(10%) saturate(706%) hue-rotate(204deg) brightness(109%) contrast(109%);
            }
          }
        }
    
      }
 

`

const Header = () => {
    const [walletConnected, setWalletConnected] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);




    const handleCopyToClipboard = () => {
        // paste wallet address in write text
        navigator.clipboard.writeText("wallet address")
            .then(() => {
                setIsCopied(true);
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    };


    return (
        <HeaderWrapper>
            <div className="bg-wrap">

                <div className="logo-wrapper">
                    <Logo/>
                </div>
                {/* <div className="links">
                    <Link href="" className="link">
                        <p className="link">
                            Home
                        </p>
                    </Link>

                </div> */}

                <div>

                    {!walletConnected && <button className='wallet-button'>
                        {/* <img src='https://trxdomains.xyz/images/tronlink.svg' alt='tron-logo' /> */}
                        <span >Connect </span>
                    </button>}

                    {walletConnected &&
                        <div className='wallet-button' >
                            <span id='wallet-address'>Wallet adress</span>
                            <span className='icon-wrapper'>
                                <ClipBoardIcon onClick={handleCopyToClipboard} />
                            </span>
                            <span className='icon-wrapper'>
                                <ExitIcon />
                            </span>
                        </div>}

                </div>


            </div>
        </HeaderWrapper>
    )
}

export default Header