import styled from "styled-components"
import { ClipBoardIcon, ExitIcon, Logo } from 'components/Icons'
import { useTronWalletAddress, useUserActionHandlers } from "../../state/user/hooks";
import { toast } from "react-toastify";
import truncateAddress from "../../utils/truncateAddress";
import Link from 'next/link';
import { useRouter } from 'next/router';


const Header = () => {
  const { onUpdateTronWalletAddress } = useUserActionHandlers();
  const walletAddress = useTronWalletAddress();
  const router = useRouter();

  return (
    <HeaderWrapper>
      <div className="bg-wrap">

        <div className="nav-links">
          <div className="logo-wrapper">
            <Link href="/">
              <a>

                <Logo />
              </a>
            </Link>

          </div>

          {<div className="links">

            <Link href="/">
              <a className={router.pathname === '/' ? 'active' : ''}>Your Domains</a>
            </Link>
            <div className="dropdown">
              <p className={(router.pathname === '/StakeMarketplace' || router.pathname === '/EnergyRental') ? ' active' : 'dropbtn'}>Stake Marketplace
                <i className="fa fa-caret-down"></i>
              </p>
              <div className="dropdown-content">
                <Link href="/StakeMarketplace">
                  <a className={router.pathname === '/StakeMarketplace' ? 'dropdown-active' : ''}>Stake TRX</a>
                </Link>
                <Link href="/EnergyRental">
                  <a className={router.pathname === '/EnergyRental' ? 'dropdown-active' : ''}>Energy Rental</a>
                </Link>

              </div>
            </div>
            <Link href="/SendTRX" >
              <a className={router.pathname === '/SendTRX' ? 'active' : ''}>Send TRX</a>
            </Link>
            <Link href="/Stake" >
              <a className={router.pathname === '/Stake' ? 'active' : ''}>Stake 2.0</a>
            </Link>
          </div>}
        </div>
        <div>

          {(!walletAddress || walletAddress.length === 0) && <button className='wallet-button' onClick={async () => {
            if (window.tronWeb && !window.tronWeb.ready) {
              toast("Please Unlock Tron Web First");
            } else if (window.tronWeb && window.tronWeb.ready) {
              if (window.tronWeb.defaultAddress.base58) {
                onUpdateTronWalletAddress(window.tronWeb.defaultAddress.base58)
              } // end of if
            } else {
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
                <ClipBoardIcon />
              </span>
              <span className='icon-wrapper' onClick={() => {
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

      .nav-links{
        display: flex;
        align-items: center;
        flex-direction: row;

        & .links{
          margin-left: 50px;
          display: flex;
          flex-direction: row;
          align-items: center;

          a{
            font-size: 18px;
            font-weight: 500;
            font-family: 'Roboto', sans-serif;
            color: #506690;
            cursor: pointer;
            margin-right: 15px;
          }
          & a:hover{
            color: rgb(56, 136, 255);
            border-bottom: 2px solid rgb(56, 136, 255);

          }

          & .active{
            font-size: 18px;
            font-weight: 500;
            font-family: 'Roboto', sans-serif;
            color: rgb(56, 136, 255);
            cursor: pointer;

            border-bottom: 2px solid rgb(56, 136, 255);
            margin-right: 15px;
          }
        }

      }

      .dropdown {
        overflow: hidden;
      }

      
      
      .dropdown .dropbtn {
        font-size: 18px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        color: #506690;
        margin: 0;
        margin-right: 15px;

      }

      .dropdown-active{
        font-size: 18px;
        font-weight: 500;
        font-family: 'Roboto', sans-serif;
        color: rgb(56, 136, 255);
        cursor: pointer;
        border-bottom: 2px solid rgb(56, 136, 255);
        background-color: #ddd;
      }
 
      .dropdown-content {
        padding-top: 5px;
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
      }
      
      .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
        margin:0 !important;
      }
      
      .dropdown-content a:hover {
        background-color: #ddd;
      }
      
      .dropdown:hover .dropdown-content {
        display: block;
      }
 

`

export default Header
