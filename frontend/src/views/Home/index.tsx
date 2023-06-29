import Header from 'components/Header/Header'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DomainData from './components/DomainData/DomainData'
import { debounce } from 'lodash';

import { TailSpin } from 'react-loader-spinner'
import { SearchIcon } from 'components/Icons'
import {useTronWalletAddress} from "../../state/user/hooks";


const HomeWrapper = styled.div`
  width : 100%;
  display : flex;
  flex-direction : column;
  align-items : center;
  background-color : transparent;
  min-height : 100vh;

  

  & .search-field-box{
    width : 100%;
    height : 60px;
    display : flex;
    flex-direction : row;
    background-color : #fff;
    box-shadow: rgb(0 0 0/20%) 0 0 10px;
    margin-bottom : 30px;
    border-radius : 8px;
    
    & input{
      padding: 8px 20px;
      border:none;
      font-size: 20px;
      border-radius : 20px;
      width: 100%;
    
    }
    & button{
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: rgb(56,136,255);
      padding: 15px 30px;
      font-family: Poppins;
      color: #fff;
      font-size: 20px;
      border: none;
      border-radius: 0 6px 6px 0;
      cursor: pointer;
    }
    
  }

  & .domain-heading{
    text-align: center;
    font-weight: 800;
    color: rgb(56,136,255);
    font-size: 40px;
    font-family: Roboto;
    margin: 0;
  }
  & .domain-description{
    font-family: Roboto;
    color: rgb(155, 155, 166);
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.5rem;
  }

  & .search-box{
    margin-top : 80px;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    text-align : center;
    width : 500px;
  }

  & .search-result{
    width : 100%;
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;

    & .ending-text{
      font-family: Roboto;
      font-size: 1.125rem;
      font-weight: 500;
    }
  }

  & .result-tabs{
      display : flex;
      flex-direction : row;
      

      & p{
        font-family: Roboto;
        font-size: 14px;
        font-weight: 500;
        border-radius : 30px;
        border : 2px solid black;
        padding : 5px 12px;
        margin-left : 10px;
      }

      & .active{
        border-color : rgb(56,136,255);
        color :rgb(56,136,255);
      }
      & p:hover{
        border-color : rgb(56,136,255);
        color :rgb(56,136,255);
      }
  }
 
`

const Home: React.FC = () => {
  
  const walletAddress = useTronWalletAddress();
  
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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


  return (
    <HomeWrapper>

      <div className='search-box'>
        <h2 className='domain-heading'>
          Your domain name
        </h2>
        <p className='domain-description'>
          Your identity across web3, one name for all your crypto addresses, and your decentralised website.
        </p>
      </div>

      <div className="search-field-box">
        <input type="text" placeholder="Search for your new domain" onChange={valueChangeHandler} />
        <button onClick={search}>
            <SearchIcon/>
        </button>
      </div>
      

      {(walletAddress && walletAddress.length > 0) && <DomainData />}

    </HomeWrapper>
  )
}

export default Home
