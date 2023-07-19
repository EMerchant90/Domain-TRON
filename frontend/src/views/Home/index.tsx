import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DomainData from './components/DomainData/DomainData'
import { debounce } from 'lodash';

import { Grid } from 'react-loader-spinner'
import { SearchIcon } from 'components/Icons'
import {useTronWalletAddress, useUserActionHandlers} from "../../state/user/hooks";
import {toast} from "react-toastify";

import TronWeb from 'tronweb'
import {TNS_CONTRACT_ADDRESS, TRON_FULL_URL} from "../../config/constants";
import tnsAbi from '../../config/abi/tns.json';
import {useTLDs} from "../../state/tlds/hooks";


const HomeWrapper = styled.div`
  width : 100%;
  display : flex;
  flex-direction : column;
  align-items : center;
  background-color : transparent;
  min-height : 100vh;

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
  .tids-list{
    display : flex;
    flex-direction : row;
    width : 100%;
    margin-left:20px;
    margin-bottom : 20px;
  }
  .tid-text{
    font-family: inter , sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding : 4px 0 4px 0;
    margin : 0;
  }
  .divider{
    border: 1px solid #DDDDDF;
    width : 1px;
    margin : 0 12px;
  }
 
`

export interface IDomainInfo {
  domain: string
  tld: string
  name: string
  price: string
  isAvailable: boolean
}
const Home: React.FC = () => {
  
  const walletAddress = useTronWalletAddress();
  const allTLDs = useTLDs()
  const { onUpdateTronWalletAddress } = useUserActionHandlers();
  
  const [searchValue, setSearchValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [domainsInfo, setDomainsInfo] = useState<IDomainInfo[]>([])

  const handleSearch = debounce(async (value: string) => {
    // Perform API search with the value
    setLoading(true);
    try {
      
      const tronWeb = new TronWeb({
        fullHost: TRON_FULL_URL,
        privateKey: '67162e5b6c29261423f731aff081bb65174e289343a779e5ae0695ca16444037',
      })
      
      let tnsContract = await tronWeb.contract(tnsAbi, TNS_CONTRACT_ADDRESS);
      
      const searchDomains = allTLDs.map((tld) => `${value}.${tld}`);
      const availables = await tnsContract.getDomainsAvailibility(searchDomains).call();
      const domainsInfo = allTLDs.map((tld, index): IDomainInfo => {
        return {
          domain: `${value}.${tld}`,
          price: '1 TRX',
          tld: tld,
          name: value,
          isAvailable: availables[index],
        }
      })
      setDomainsInfo(domainsInfo)
      console.log(availables)
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
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
      
      <div className='tids-list'>
        {['tron', 'trx', 'dao'].map((tld , index) =>
          <div>
            <p className='tid-text'>.{tld} {index != tld.length-1 && <span className='divider'/>}</p>
          </div>
        )}
      </div>
      {
        loading ?
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          :
          <DomainData domainsInfo={domainsInfo} handleSearch={handleSearch} searchValue={searchValue}/>
        
      }

    </HomeWrapper>
  )
}

export default Home
