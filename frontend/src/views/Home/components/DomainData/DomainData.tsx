import { ForwardArrowIcon, HeartIcon, RedCheckIcon } from "components/Icons";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {IDomainInfo} from "../../index";
import {useTronWalletAddress} from "../../../../state/user/hooks";
import {toast} from "react-toastify";
import tnsAbi from "../../../../config/abi/tns.json";
import {TNS_CONTRACT_ADDRESS} from "../../../../config/constants";
import {ThreeDots} from "react-loader-spinner";


interface DomainDataProps {
  domainsInfo: IDomainInfo[]
  handleSearch: Function
  searchValue: string
}

const DomainData = ({domainsInfo, handleSearch, searchValue}) => {
  
  const walletAddress = useTronWalletAddress();
  
  const [mintDomainIndexInProgress, setMintDomainIndexInProgress] = useState(-1)
  return (
        <DomainDataWrapper>
          
             <div className="extension-details-box">
                {domainsInfo.map((item, index) => {
                    return (
                    <div
                      key={index}
                      className="extension-details">
                        <div className="detail-card">
                            <RedCheckIcon />
                            <div className="user-domain">
                                <p>name<span>.{item.domain}
                                </span></p>
                                <p className={item.isAvailable ? "status" : "status-not-available"}>{
                                    item.isAvailable ? "Available" : "Not Available"
                                }</p>
                            </div>
                        </div>

                        <div className="flex-row">
                            <p className="domain-extension-price">
                                {item.price}
                            </p>
                          {
                            mintDomainIndexInProgress === index ?
                              <ThreeDots
                                height="50"
                                width="50"
                                radius="9"
                                color="#4fa94d"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{
                                  paddingLeft: '10px',
                                }}
                                visible={true}/>
                              :
                            <button className={item.isAvailable ? "mint-button" : "already-minted-button"} disabled={!item.isAvailable}
                            onClick={async () => {
                              try {
                                if(!walletAddress || walletAddress.length === 0) {
                                  toast('Please Connect Your Wallet First', {
                                    type: 'error'
                                  })
                                  throw new Error('Need to connect wallet first before mint.')
                                }
                                debugger;
                                setMintDomainIndexInProgress(index)
                                const tronWeb = window.tronWeb
                                let tnsContract = await tronWeb.contract(tnsAbi, TNS_CONTRACT_ADDRESS);
                                
                                const tx = await tnsContract.buyDomain(item.name, item.tld).send({
                                  value: 10000000,
                                  shouldPollResponse:true,
                                });
                                handleSearch(searchValue)
                              } catch (error) {
                                console.error(error)
                              } finally {
                                setMintDomainIndexInProgress(-1)
                              }
                            }}
                            >
                              {item.isAvailable ? "Mint" : "Minted" }</button>
                          }
                        </div>
                    </div>
                )})}

            </div>
        </DomainDataWrapper>)

}

const DomainDataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  fons-size: 16px;
  font-family: 'Roboto', sans-serif;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 30px;

  & .card-holder {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #fff;

  }

  & .domain-card {
    display: flex;
    flex-direction: column;
    padding: 24px 8px;
    border: 1px solid #eaeaea;
    text-align: center;
    min-width: 132px;
  }

  & .active-domain-card {
    display: flex;
    flex-direction: column;
    padding: 24px 8px;
    border: 1px solid #eaeaea;
    text-align: center;
    min-width: 132px;
    box-shadow: rgb(228, 229, 234) 0px 0px 0px 1px, rgb(13, 103, 254) 0px -4px 0px inset;
    background-color: rgb(240, 245, 255) !important;
  }

  & .extension-name {
    font-family: Inter, sans-serif;
    font-weight: 700;
    font-size: 20px;
    line-height: 1.5;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  & .extension-price {
    font-family: Inter, sans-serif;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;

    & svg {
      margin-right: 10px;
    }
  }

  & .domain-card:hover {
    box-shadow: rgb(228, 229, 234) 0px 0px 0px 1px, rgb(13, 103, 254) 0px -4px 0px inset;
    background-color: rgb(240, 245, 255) !important;
  }

  & .mint-button {
    width: 140px;
    height: 40px;
    background-color: rgb(56, 136, 255);
    border-radius: 10px;
    border: none;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    cursor: pointer;
    margin: 0 10px;
  }

  & .already-minted-button {
    width: 140px;
    height: 40px;
    background-color: rgba(56, 136, 255, 0.55);
    border-radius: 10px;
    border: none;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 17px;
    cursor: pointer;
    margin: 0 10px;
  }

  & .forward-icon {
    margin: 0 0 5px 0;
  }

  & .forward-icon-text {
    color: rgb(56, 136, 255);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    font-family: Inter, sans-serif;
    margin: 0;
  }

  & .extension-details-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;


  }

  & .extension-details {
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 8px;
    width: 70%;
    margin-bottom: 10px;
  }

  & .detail-card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;

    & svg {
      margin-right: 10px;
    }
  }

  & .user-domain {
    font-family: Inter, sans-serif;
    font-weight: 700;
    font-size: 18px;

    & p {
      margin: 0;

    }

    & span {
      font-family: Inter, sans-serif;
      font-weight: 300;
      font-size: 18px;
    }

    & .status {
      background: rgb(54, 171, 97);
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      padding: 8px 5px;
      border-radius: 8rem;
      margin-top: 5px;
      width: 80px;
    }

    & .status-not-available {
      background: rgb(171, 54, 54);
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      padding: 8px 5px;
      border-radius: 8rem;
      margin-top: 5px;
      width: auto;
    }
  }

  & .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  & .domain-extension-price {
    margin: 0 10px;
    font-family: Inter, sans-serif;
    font-weight: 400;
    font-size: 18px;
  }

`

export default DomainData;
