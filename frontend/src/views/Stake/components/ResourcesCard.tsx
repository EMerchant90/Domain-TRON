import React, { useEffect } from 'react'
import styled from 'styled-components'
import EnergyCard from './EnergyCard'
import BandwidthCard from './BandwidthCard'
import { getUserResourceInfo } from 'utils/web3/getResourceInfo'
import { useTronWalletAddress, useUserActionHandlers } from 'state/user/hooks'
import { toast } from "react-toastify";
import { useAppLoader } from 'state/loading/hooks/useAppLoader'
import { getResourceDataFromStaking } from 'api/getResourceDataFromStaking'
import { getDelegatedResourceData } from 'api/getDelegatedResourceData'
import { getDelegatedToResourceData } from 'api/getDelegatedToResourceData'
import StakingTable from './Tables/StakingTable'
import DelegatedByOthersTable from './Tables/DelegatedByOthers'
import DelegatedToOthersTable from './Tables/DelegatedToOthersTable'
import { ThreeDots } from 'react-loader-spinner'

const ResourcesCard = () => {

  const walletAddress = useTronWalletAddress()
  const { onUpdateTronWalletAddress } = useUserActionHandlers();
  const { showLoader, hideLoader } = useAppLoader();

  const [resourcesInfo, setResourcesInfo] = React.useState<any>(null)
  const [gotInfo, setGotInfo] = React.useState<boolean>(false)
  const [activeIndex, setActiveIndex] = React.useState<number>(0)
  const [activeIndexData  , setActiveIndexData] = React.useState<any>([])
  const [tableData , setTableData] = React.useState<any>([])
  const [loading , setLoading] = React.useState<boolean>(false)
  const [contractInfo , setContractInfo] = React.useState<any>([])

  useEffect(() => {
    if (!walletAddress) return
    const fetch = async () => {
      showLoader()
      const get = await getUserResourceInfo(walletAddress)
      setResourcesInfo(get)
      hideLoader()
      setGotInfo(true)
      console.log(get)
    }
    fetch()

  }, [walletAddress])

    useEffect(() => {
      const fetch = async () => {
        setLoading(true)
        if(activeIndex === 0 ){
          const get = await getResourceDataFromStaking(walletAddress)
          console.log(get.data)
          setActiveIndexData(get.data)
        }else if(activeIndex === 1){
          const get = await getDelegatedResourceData(walletAddress)
          console.log(get.data)
          setActiveIndexData(get.data)
          setContractInfo(get.contractInfo)
      }else{
        const get = await getDelegatedToResourceData(walletAddress)
          console.log(get.data)
        setActiveIndexData(get.data)
        setContractInfo(get.contractInfo)
      }
      setLoading(false)
    }
    fetch()
    },[walletAddress , activeIndex])


    useEffect(()=>{ 
      if(!walletAddress || !activeIndexData){ return}
      else{

        switch (activeIndex) {
          case 0:
            const mappedData0 = activeIndexData.map((item) => {
              const resourceType = item.resource === 0 ? "Bandwidth" : "Energy";
              const resourceAmount = item.resourceValue;
              const stakedAsset = `${item.balance / Math.pow(10, 6)} TRX`;
              const lastUpdatedAt = new Date(item.operationTime).toLocaleString();
              const action = "Unstake";
        
              return {
                "Resource Type": resourceType,
                "Resource Amount": resourceAmount,
                "Staked Asset": stakedAsset,
                "Last Updated At": lastUpdatedAt,
                "Action": action,
              };
            });
            setTableData(mappedData0)

            break;
        
          case 1:
            const mappedData1 = activeIndexData.map((item) => {
              const resourceType = item.resource === 0 ? "Bandwidth" : "Energy";
              const resourceAmount = item.resourceValue;
              const stakedAsset = `${item.balance / Math.pow(10, 6)} TRX`;
              const lastUpdatedAt = new Date(item.operationTime).toLocaleString();
              const senderAddress = item.ownerAddress;
              const recieverAddress = item.receiverAddress;
              const unlocksAt = item.expireTime === 0 ? "- -":  new Date(item.expireTime).toLocaleString();
        
              return {
                "Resource Type": resourceType,
                "From": senderAddress,
                "To": recieverAddress,
                "Resource Amount": resourceAmount,
                "Unlocks At": unlocksAt,
                "Staked Asset": stakedAsset,
                "Last Updated At": lastUpdatedAt,
              };
            });
            setTableData(mappedData1)
            break;
        
          case 2:
            const mappedData2 = activeIndexData.map((item) => {
              const resourceType = item.resource === 0 ? "Bandwidth" : "Energy";
              const resourceAmount = item.resourceValue;
              const stakedAsset = `${item.balance / Math.pow(10, 6)} TRX`;
              const lastUpdatedAt = new Date(item.operationTime).toLocaleString();
              const senderAddress = item.ownerAddress;
              const recieverAddress = item.receiverAddress;
              const unlocksAt = item.expireTime === 0 ? "- -":  new Date(item.expireTime).toLocaleString();
              const action  = "Reclaim"
        
              return {
                "Resource Type": resourceType,
                "From": senderAddress,
                "To": recieverAddress,
                "Resource Amount": resourceAmount,
                "Unlocks At": unlocksAt,
                "Staked Asset": stakedAsset,
                "Last Updated At": lastUpdatedAt,
                "Action": action,
              };
            });
            setTableData(mappedData2)
            break;
        
          default:
            // Handle the default case (if activeIndexData is none of 0, 1, or 2)
        }
  
  }
  },[activeIndexData])

  const TableRender = () => {
    if(tableData.length === 0 ) {return <p>No Data Found</p>}
    else if(activeIndex === 0){
      return <StakingTable data={tableData} index={activeIndex} />
    }else if(activeIndex === 1){
      return <DelegatedByOthersTable data={tableData} contractInfo={contractInfo} />  
    }else{
      return <DelegatedToOthersTable data={tableData} contractInfo={contractInfo} />
    }
  }


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
        <p>  Resources Overview</p>

        <div className='tabs'>
          <button className={activeIndex === 0 ? "active" : ""} onClick={()=>setActiveIndex(0)}>From Staking</button>
          <button className={activeIndex === 1 ? "active" : ""} onClick={()=>setActiveIndex(1)}>Delegated by others</button>
          <button className={activeIndex === 2 ? "active" : ""} onClick={()=>setActiveIndex(2)}>Delegated to others</button>
        </div>
      {loading ?      <div className='loader-wrapper'>

<ThreeDots
  height="50"
  width="50"
  radius="9"
  color=" rgb(56, 136, 255)"
  ariaLabel="three-dots-loading"
  wrapperStyle={{
    paddingLeft: '10px',
    paddingRight: '15px',
  }}
  visible={true} />
</div> :

        <TableRender/>
}

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
  
    .tabs{
      margin-bottom:20px;

      button{
        background-color: #edf0f4;
        border:1px solid #ddd;
        padding: 5px 15px;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
       .active{
        background-color:#000;
        color:#fff;
      }
    }
  
    .loader-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      height: inherit;
    }
`       