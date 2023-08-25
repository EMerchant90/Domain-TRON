import React, { useEffect } from 'react'
import Modal from "components/Modal/Modal"
import styled from "styled-components"
import { useAppLoader } from 'state/loading/hooks/useAppLoader';
import { useTronWalletAddress } from 'state/user/hooks';
import { GetEstimatedFee } from 'utils/web3/getTransactionEstimate';
import { buyDomain } from 'contract/tnsContractInteraction';
import { getUserEnergy } from 'utils/web3/getWalletEnergy';

const MintModal = ({showModal , setShowModal , item}) => {
    const walletAdress = useTronWalletAddress();

    const { hideLoader, showLoader } = useAppLoader();
    const [estimatedEnergy, setEstimatedEnergy] = React.useState(0);
    const [estimatedBandwidth, setEstimatedBandwidth] = React.useState(0);
    const [estimatedTrx, setEstimatedTrx] = React.useState(0);
    const [userEnergy, setUserEnergy] = React.useState({EnergyLimit:0,EnergyUsed:0});

    const unitPricePerEnergy = 0.000420394; 

    useEffect(()=>{
      if(estimatedEnergy != 0) return
      const fetch = async () => {
        const userEnergy = await getUserEnergy(walletAdress);
        const get = await GetEstimatedFee(walletAdress, item);
  
        setUserEnergy(userEnergy)
        setEstimatedEnergy(get.energy)
        setEstimatedBandwidth(get.bandwidth)
      }
      fetch();

    },[])

    useEffect(()=>{
      setEstimatedTrx( (estimatedEnergy - (userEnergy.EnergyLimit - userEnergy.EnergyUsed)) * unitPricePerEnergy )
    },[estimatedEnergy])

    const handleMintDomain =  () => {
            showLoader();
            const mint =  buyDomain(item.name, item.tld).then((res)=>{
            }).finally(()=>{
              setShowModal(false);
              hideLoader()
            });

    }

    return (
        <Modal show={showModal} title={"Mint Modal"} changeModal={setShowModal}>
        <MintModalWrapper>

                <p className='content-heading'>
                Expected fee consumption for this transaction
                </p>
              
                <div className='billing-details'>
                    <div className=' expected-price-box flex-between '>
                        <p>Estimated Energy Consumption</p>
                        <span>{estimatedEnergy}</span>
                    </div>
                    <div className=' expected-price-box flex-between '>
                        <p>Estimated Bandwidth Consumption</p>
                        <span>{ estimatedBandwidth != 0 ? estimatedBandwidth: `475`}</span>
                    </div>
                    <div className=' expected-price-box flex-between '>
                        <p >Estimated TRX Consumption </p>
                        <span>{`${estimatedTrx} TRX` }</span>
                    </div>
                </div>

                <div className='button-box'>
                <button className='cancel-button' onClick={()=>setShowModal(false)}>
                    Cancel
                </button>
                <button className='submit-button' onClick={handleMintDomain}>
                    Mint Now 
                </button>
       
                </div>
       
            </MintModalWrapper>

        </Modal>
    )
}

export default MintModal


const MintModalWrapper = styled.div`
    display: flex;
    flex-direction: column;

    .content-heading {
        font-size: 16px;
        font-weight: 600;
        margin:0;
        color: rgb(155,155,166);

    }

    .button-box{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        margin-top: 20px;
    }
    .cancel-button{
        background: #fff;
        padding: 10px 15px;
        border-radius: 8px;
        text-align: center;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        margin-right: 10px;
        width: 100%;
    } 
     .cancel-button:hover{
        background: rgba(255, 0, 0 ,0.5);
        color: #fff
        border:none;
        outline:none;
      }

      .submit-button{
        width: 100%;
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
    
      .error-text{
        font-size: 12px;
        font-weight: 500;
        color:red;
        margin:0 0 10px 
      }

      .flex-between{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-between;
        }
      .border-bottom{
        border-bottom: 1px solid  #fff;
      }
    
      .billing-details{
        padding: 12px 20px;
        background-color: rgb(241,243,243);
        border-radius: 8px;
        margin-top: 20px;
      }
    
    
      .expected-price-box{
        display:flex;
        flex-direction:row;
        align-items:center;
        padding: 10px 0;
    
        img{
          filter: brightness(0) saturate(100%) invert(48%) sepia(90%) saturate(637%) hue-rotate(195deg) brightness(102%) contrast(107%);
          margin-right: 10px;
      }
      p{
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: 	#5A5A5A;
        margin:0;
      }
      span{
        font-weight: 600;
        font-size: 12px;
      }
      }

`