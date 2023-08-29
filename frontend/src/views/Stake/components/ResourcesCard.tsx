import React, { useEffect } from 'react'
import styled from 'styled-components'
import EnergyCard from './EnergyCard'
import BandwidthCard from './BandwidthCard'
import { getUserResourceInfo } from 'utils/web3/getResourceInfo'
import { useTronWalletAddress, useUserActionHandlers } from 'state/user/hooks'
import { toast } from "react-toastify";
import { useAppLoader } from 'state/loading/hooks/useAppLoader'

const ResourcesCard = () => {

  const walletAddress = useTronWalletAddress()
  const { onUpdateTronWalletAddress } = useUserActionHandlers();
  const { showLoader, hideLoader } = useAppLoader();

  const [resourcesInfo, setResourcesInfo] = React.useState<any>(null)
  const [gotInfo, setGotInfo] = React.useState<boolean>(false)

  useEffect(() => {
    if (!walletAddress) return
    const fetch = async () => {
      showLoader()
      const get = await getUserResourceInfo(walletAddress)
      setResourcesInfo(get.bandwidth)
      hideLoader()
      setGotInfo(true)
      console.log(get)
    }
    fetch()

  }, [walletAddress])

  const handleWalletConnect = () => {
    event.preventDefault();
    if (window.tronWeb && !window.tronWeb.ready) {
      toast('Please Unlock Tron Web First');
    } else if (window.tronWeb && window.tronWeb.ready) {
      const base58Address = window.tronWeb.defaultAddress.base58;
      if (base58Address) {
        onUpdateTronWalletAddress(base58Address);
      }
    } else {
      toast('Please Install Tron Web Extension.');
    }
  };


  return (<>
    {!walletAddress && <ResourcesCardWrapper>
      <p>Connect your wallet to see your resources data</p>

      <button className='submit-button' onClick={handleWalletConnect}>
        Connect wallet to get resources
      </button>
    </ResourcesCardWrapper>}
    {walletAddress && gotInfo && <ResourcesCardWrapper>

      <p className='content-header'>

        My Resources
      </p>


      <div className='main-flex'>
        <EnergyCard energyInfo={resourcesInfo} />
        <BandwidthCard bandwidthInfo={resourcesInfo} />
      </div>
      <div className='total-resources'>
        <p>Total Resources</p>

        <div className='details-box'>
          <div className='main-flex'>
            <p>TRX</p>
            <p>4000 TRX</p>
          </div>
          <div className='main-flex'>
            <p>sTRX</p>
            <p>4000</p>
          </div>
          <div className='main-flex'>
            <p>Energy</p>
            <p>400000</p>
          </div>
          <div className='main-flex'>
            <p>Bandwidth</p>
            <p>4000</p>
          </div>
        </div>

      </div>

    </ResourcesCardWrapper>}
  </>
  )
}

export default ResourcesCard


const ResourcesCardWrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding: 26px 30px ;
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    background-color: #fff;
    background: linear-gradient(to bottom right, #6699FF 0%, #FFFFFF 45%);
    border-radius:10px;
    font-family : 'Roboto', sans-serif;

    .content-header{
        margin:0;
        font-size: 20px;
        font-weight: 600;
        color : #506690;
        margin-bottom:20px;
        
    }
    .main-flex{
      display:flex;
      flex-direction:row;
      justify-content:space-between;

      p{
        margin:0;
        font-size: 16px;
        font-weight: 400;
        color : #73787b;
      }
      span{
        margin:0;
        font-size: 16px;
        font-weight: 600;
        color : #506690;
      }
    }

    .details-box{
      background-color: rgb(241,243,243);
      padding: 20px;
    }

    .submit-button{
      width: 100%;
      margin-top:25px;
      padding: 10px 15px;
      border-radius: 8px;
      border:none;
      background: linear-gradient(90deg , rgba(56, 136, 255, 1) , #fff);
      color:#fff;
      font-weight: 500;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    .submit-button:hover{
      color: #5a5a5a
    }
  
  
`       