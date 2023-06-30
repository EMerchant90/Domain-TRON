import styled from "styled-components"
import { ClipBoardIcon, ExitIcon, Logo } from 'components/Icons'
import {useTronWalletAddress, useUserActionHandlers} from "../../state/user/hooks";
import {toast} from "react-toastify";
import truncateAddress from "../../utils/truncateAddress";

import TronWeb from 'tronweb'
import {TRON_FULL_URL} from "../../config/constants";

const Header = () => {
    const { onUpdateTronWalletAddress } = useUserActionHandlers();

    const walletAddress = useTronWalletAddress();

    


    return (
        <HeaderWrapper>
            <div className="bg-wrap">

                <div className="logo-wrapper">
                    <Logo/>
                    
                </div>
                
                <div>

                    {(!walletAddress || walletAddress.length === 0) && <button className='wallet-button' onClick={async () => {
                      if (window.tronWeb && !window.tronWeb.ready) {
                        toast("Please Unlock Tron Web First");
                      } else if (window.tronWeb && window.tronWeb.ready) {
                        if (window.tronWeb.defaultAddress.base58) {
                          onUpdateTronWalletAddress(window.tronWeb.defaultAddress.base58)
                        } // end of if
                      } else{
                        toast("Please Install Tron Web Extension.");
                      }
                    }}>
                        <span >Connect </span>
                    </button>}

                    {(walletAddress && walletAddress.length > 0) &&
                        <div className='wallet-button' >
                            <span id='wallet-address'>{truncateAddress(walletAddress)}</span>
                            <span className='icon-wrapper' onClick={async () => {
                              navigator.clipboard.writeText(walletAddress)
                                .then(() => {
                                  toast("Copied!!");
                                })
                                .catch((error) => {
                                  console.error('Error copying to clipboard:', error);
                                });
                            }}>
                                <ClipBoardIcon  />
                            </span>
                            <span className='icon-wrapper' onClick={() =>{
                              onUpdateTronWalletAddress(null)
                            }}>
                                <ExitIcon />
                            </span>
                        </div>}
                </div>


            </div>
        </HeaderWrapper>
    )
}
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
        font-size: 14px;
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

export default Header
