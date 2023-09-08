import React, { useEffect } from 'react'
import Modal from "components/Modal/Modal"
import styled from "styled-components"
import { useAppLoader } from 'state/loading/hooks/useAppLoader';
import { useTronWalletAddress } from 'state/user/hooks';
import { GetEstimatedFee } from 'utils/web3/getTransactionEstimate';
import { buyDomain } from 'contract/tnsContractInteraction';
import { getUserEnergy } from 'utils/web3/getWalletEnergy';
import CircledQuestion from 'components/Icons/CircledQuestionMark/CircledQuestion';
import { getUserBandwidth } from 'utils/web3/getWalletBandwidth';

const MintModal = ({ showModal, setShowModal, item }) => {
  const walletAdress = useTronWalletAddress();

  const { hideLoader, showLoader } = useAppLoader();
  const [estimatedEnergy, setEstimatedEnergy] = React.useState(0);
  const [estimatedBandwidth, setEstimatedBandwidth] = React.useState(0);
  const [estimatedTrx, setEstimatedTrx] = React.useState(0);
  const [userEnergy, setUserEnergy] = React.useState({ EnergyLimit: 0, EnergyUsed: 0, NetLimit: 0, NetUsed: 0 });
  const [loading, setLoading] = React.useState(true);
  const [userBandwidth, setUserBandwidth] = React.useState(0)

  const unitPricePerEnergy = 0.000420394;
  const unitPricePerBandwidth = 0.1 / 1000000

  useEffect(() => {
    if (estimatedEnergy != 0) return
    const fetch = async () => {
      const [userEnergy, userBandwidth, estimatedFee] = await Promise.all([
        getUserEnergy(walletAdress),
        getUserBandwidth(walletAdress),
        GetEstimatedFee(walletAdress, item)
      ])

      setUserBandwidth(userBandwidth)
      setUserEnergy(userEnergy)
      setEstimatedEnergy(estimatedFee.energy)
      setEstimatedBandwidth(estimatedFee.bandwidth)
      setLoading(false)
    }
    fetch();

  }, [])

  useEffect(() => {
    const energyUsed = userEnergy.EnergyUsed || 0;
    const bandwidthUsed = userEnergy.NetUsed || 0;

    const energyExceeded = estimatedEnergy > userEnergy.EnergyLimit - energyUsed;
    const bandwidthExceeded = estimatedBandwidth > userEnergy.NetLimit - bandwidthUsed;

    const trxRequiredForEnergy = energyExceeded
      ? (estimatedEnergy - (userEnergy.EnergyLimit - energyUsed)) * unitPricePerEnergy
      : 0;

    const trxRequiredForBandwidth = bandwidthExceeded
      ? (estimatedBandwidth - (userEnergy.NetLimit - bandwidthUsed)) * unitPricePerBandwidth
      : 0;

    const totalTrxRequired = trxRequiredForEnergy + trxRequiredForBandwidth;
    if (Object.values(userEnergy).every((val) => val === 0)) {
      setEstimatedTrx((estimatedEnergy * unitPricePerEnergy) + (estimatedBandwidth * unitPricePerBandwidth));
    }else{
      setEstimatedTrx(totalTrxRequired);
    }
  }, [estimatedEnergy, estimatedBandwidth, userEnergy, userBandwidth, unitPricePerEnergy, unitPricePerBandwidth]);


  const handleMintDomain = () => {
    showLoader();
    const mint = buyDomain(item.name, item.tld).then((res) => {
    }).finally(() => {
      setShowModal(false);
      hideLoader()
    });

  }


  return (
    <Modal show={showModal} title={"Mint"} changeModal={setShowModal}>
      <MintModalWrapper>

        <div className='content-heading'>
          Expected fee consumption for this transaction <div className="tooltip"><CircledQuestion />
            <span className="tooltiptext"><b> Resources Consumed = Bandwidth + Energy</b><br /><br />
              <b>Bandwidth: </b>
              You can only use free Bandwidth or Bandwidth from staking to pay transaction fee. If your Bandwidth is insufficient, then the entire fee needs to be paid in TRX.<br /><br />
              <b>Energy: </b>
              If your Energy is insufficient, the remaining fee after deducting your entire Energy can be paid in TRX.<br /><br />
              Energy consumed is calculated on the assumption that
              the user will pay for all resources, while the actual on- chain data may vary.</span>

          </div>
        </div>

        <div className='billing-details'>
          <div className=' expected-price-box flex-between '>
            <p>Estimated Energy Consumption</p>
            <span>{loading ? "Calculating..." : estimatedEnergy}</span>
          </div>
          <div className=' expected-price-box flex-between '>
            <p>Estimated Bandwidth Consumption</p>
            <span>{loading ? "Calculating..." : estimatedBandwidth}</span>
          </div>
          <div className=' expected-price-box flex-between '>
            <p >Estimated TRX Consumption </p>
            <span>{`${estimatedTrx && estimatedTrx > 0 ? estimatedTrx.toFixed(2) : "0"} TRX`}</span>
          </div>
        </div>

        <div className='button-box'>
          <button className='cancel-button' onClick={() => setShowModal(false)}>
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


      .tooltip {
        position: relative;
        display: inline-block;
        margin-left: 5px;
      }
      
      .tooltip .tooltiptext {
        visibility: hidden;
        width: 250px;
        background-color: rgb(241,243,243);
        text-align: left;
        border-radius: 6px;
        padding: 10px ;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: #5A5A5A;
        /* Position the tooltip */
        position: absolute;
        z-index: 1;
      }
      
      .tooltip:hover .tooltiptext {
        visibility: visible;
      }

`