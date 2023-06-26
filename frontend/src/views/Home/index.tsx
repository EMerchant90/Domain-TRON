import Header from 'components/Header/Header'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import DomainData from './components/DomainData/DomainData'
import TotalDomain from './components/TotalDomains/TotalDomains'
import { debounce } from 'lodash';

import { TailSpin } from  'react-loader-spinner'
import { ClipBoardIcon, ExitIcon } from 'components/Icons'


const HomeWrapper = styled.div`
  width : 100%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  background-color : transparent;

  & .error-box{
    width : 100%;
    background-color : #f8d7da;
    border-color : #f5c6cb;
    display : flex;
    justify-content : center;
    border-radius : 4px;
    margin: 100px 0 30px 0;
    & p{
      padding: 12px 20px;
      color: #721c24;
      font-size : 16px;
      font-family : 'Roboto', sans-serif;
      text-align : center;
      line-height : 1.8;
      width : 80%;
      margin : 0 ;
    }

  }


  & .wallet-button{
    background-color: transparent;
    padding: 14px 20px;
    font-family: Poppins;
    color: #010101;
    border-radius: 30px;
    border: 2px solid #df2b20;
    font-weight: 700;
    font-size: 16px;
    width: fit-content;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 20px;
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
      background-color: #df2b20;
      color: #ffffff; /* Update to the desired text color */
    }
  
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0;
      background: linear-gradient(to bottom, rgba(223, 43, 32, 0.5), transparent);
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

  & .search-field-box{
    width : 70%;
    heught : 60px;
    display : flex;
    flex-direction : row;
    background-color : #fff;
    box-shadow: rgb(0 0 0/20%) 0 0 10px;
    margin-bottom : 30px;
    
    & input{
      padding: 8px 20px;
      border:none;
      font-size: 20px;
      width: 100%;
    }
    & button{
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #ff0003;
      padding: 15px 30px;
      font-family: Poppins;
      color: #fff;
      font-size: 20px;
      border: none;   
      border-radius: 0 6px 6px 0;
      cursor: pointer;   
    }
     
  }

`

const Home: React.FC = () => {

  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleSearch = debounce((value: string) => {
    // Perform API search with the value
    setLoading(!loading);
    console.log(value);
  }, 500);

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    handleSearch(value);
  };

  useEffect(() => {
    return () => {
      // Cleanup the debounced function
      handleSearch.cancel();
    };
  }, []);

  const search = () => {
    handleSearch(searchValue);
  };


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
    <HomeWrapper>
      <div className='error-box'>
        <p>
        You are not logged in or your wallet is locked. Please open the TronLink wallet and enter the password to unlock.
      Select "Tron Mainnet" network, then press the "Connect Wallet" button below.
        </p>
      </div>

      {  !walletConnected &&   <button className='wallet-button'> 
        <img src='https://trxdomains.xyz/images/tronlink.svg' alt='tron-logo'/>
        <span >Connect Wallet (TronLink)</span>
      </button>}

   {  walletConnected &&
     <div className='wallet-button' > 
        <span  id='wallet-address'>Wallet adress</span>
        <span className='icon-wrapper'>
          <ClipBoardIcon onClick={handleCopyToClipboard}/>
        </span>
        <span className='icon-wrapper'>
          <ExitIcon/>
        </span>
      </div>}


      <div className="search-field-box">
        <input type="text" placeholder="Search domain" onChange={valueChangeHandler} />
        <button onClick={search}>
        <TailSpin
          height="20"
          width="20"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{marginRight: '10px'}}
          wrapperClass=""
          visible={loading}
        />
          Search
        </button>
      </div>

        {!walletConnected && <DomainData/>}
        {/* {walletConnected && <TotalDomain/>} */}

    </HomeWrapper>
  )
}

export default Home
