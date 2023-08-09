import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form"
import { useTronWalletAddress, useUserActionHandlers } from "../../../state/user/hooks";
import { toast } from "react-toastify";
import { rentEnergy } from 'contract/contractInteraction';
import { getWalletTrxBalance } from 'utils/web3/getWalletTrxBalance'
import { useAppLoader } from 'state/loading/hooks/useAppLoader';
interface IFormInput {
  amount: number
  duration: number
}

const EnergryRentCard = () => {

  const { showLoader , hideLoader } = useAppLoader();
  const walletBalance = getWalletTrxBalance()

  const { onUpdateTronWalletAddress } = useUserActionHandlers();
  const walletAddress = useTronWalletAddress();
  
  const [energyAmount, setEnergyAmount] = useState(100000);
  const [duration, setDuration] = useState(3);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const calculateTotalAmount = () => {
    const unitPriceToRentalEnergy = (78.055361 * 1440) / (100000 * 3);
    const amountInTrx = (energyAmount * (unitPriceToRentalEnergy * duration)) / 1440;
    return amountInTrx;
  };
  
  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
  }, [duration, energyAmount]);
  
  const billing = [
    {
      key: 'Prepaid rent',
      value: '28.443752 TRX'
    },
    {
      key: 'Energy Consumed',
      value: 'Estimating ...'
    }
  ];
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IFormInput>();
  
  const submitHandler: SubmitHandler<IFormInput> = async (data) => {
    event.preventDefault();
    showLoader();

    await rentEnergy(data.amount, data.duration).finally(()=>{
      hideLoader();
    });
    reset();
  };
  
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
  

  return (
    <EnergyRentCardWrapper>
        <div className='content-header'>
      <p>Rent Energy</p>
    </div>
    <form className='content-wrapper' onSubmit={handleSubmit(submitHandler)}>
      <p className='balance'> {walletBalance !== null?  walletBalance :"--"} TRX</p>

      <div className='input-box'>
        <label>Amount</label>
        <div className='divider' />
        <input
          type='number'
          placeholder='100,000'
          {...register("amount", { required: true, onChange: (event) => setEnergyAmount(event.target.value), minLength: 6 })}
        />
        <span>Energy/Day</span>
      </div>
      {errors.amount?.type === 'required' && <p className='error-text'>This field is required</p>}
      {errors.amount?.type === 'minLength' && <p className='error-text'>Amount cannot be less than 100000</p>}

      <div className='input-box'>
        <label>Duration</label>
        <div className='divider' />
        <input
          type='number'
          placeholder='3'
          {...register("duration", { required: true, onChange: (event) => setDuration(event.target.value) })}
        />
        <span className='max-button'>Max</span>
        <div className='divider' />
        <span>Day(s)</span>
      </div>
      {errors.duration && <p className='error-text'>This field is required</p>}

      <p className='system-description'>
        The system will recycle the Energy at around 2023-08-04 18:44. The actual time may vary depending on the market situation.
      </p>

      <div className='billing-details'>
        <div className='flex-between border-bottom'>
          <p>Total</p>
          <span>{`${totalAmount} TRX`}</span>
        </div>
        {billing.map((item, index) => (
          <div key={index} className='flex-between'>
            <p className='key'>{item.key}</p>
            <span className='value'>{item.value}</span>
          </div>
        ))}
        <div className='expected-price-box'>
          <img src='https://app.justlend.org/static/media/loud-icon.54959299.svg' alt='Loud Icon' />
          <p>Expected Rental Subsidies</p>
          <span>&nbsp;≈ 7.550745 TRX</span>
        </div>
      </div>

      <div className='tutorial-box'>
        <img src='https://app.justlend.org/static/media/warning-yellow-icon.880d4dde.svg' alt='Warning Icon' />
        <p>
          Wallet signature page's "Resources Consumed" doesn't show gas subsidy from JustLend DAO. Please refer to the transaction result for actual subsidy amount.
        </p>
      </div>

      {walletAddress ? (
        <button className='submit-button' type='submit'>
          Rent Now
        </button>
      ) : (
        <button className='submit-button' onClick={handleWalletConnect}>
          Connect wallet to rent Energy
        </button>
      )}
    </form>

    </EnergyRentCardWrapper>
  )
}

export default EnergryRentCard


const EnergyRentCardWrapper = styled.div`
  background-color: #fff;
  border-radius:10px;
  font-family : 'Roboto', sans-serif;
  box-shadow: 0 10px 20px rgba(0,0,0,.1);
  max-width: 700px;
  & .content-header{
      padding: 26px 30px 17px;
      border-bottom: 1px solid rgba(0,0,0,.1);
      display:flex;
      flex-direction:row;
      align-items:center;
      
      p{
          margin: 0;
          font-weight: 600;
          font-size: 18px;
          line-height: 25px;
      }

      span{
        background-color: rgba(56, 136, 255, 0.6);
        color: rgb(255, 255, 255);
        padding: 3px 10px;
        font-style: normal;
        font-size: 12px;
        margin-left: 10px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;

      }
  }
  .content-wrapper{
    padding: 0 30px 40px;

    & .balance{
      width: 100%;
      text-align: right;
    }
    
  }

  .input-box{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    background-color: rgb(241,243,243);
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 10px;
    label{
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
  
    }

    input{
      outline: none;
      border: none;
      margin-right: 10px;
      font-size: 14px;
      font-weight: 600;
      background-color: transparent;
      height: 30px;
      width: -webkit-fill-available;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input::placeholder {
      color: rgba(200, 200, 200, 1);
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }

    span{
      font-weight: 400;
      font-size: 14px;
    }


    & .divider{
        width: 1px;
        height: 30px;
        background-color: rgba(0,0,0,.1);
        margin: 0 10px;
    }

    & .max-button{
      line-height: 36px;
      font-weight: 400;
      font-size: 14px;
      color: #9195fb;
      cursor: pointer;
    }

  }

  .system-description{
    font-size: 12px;
    line-height: 17px;
    text-align: right;
    margin-top: 10px;
    color: rgb(155, 155, 166);
  }

  .flex-between{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    margin-bottom: 10px;

    p{
      margin: 0;
    }

    }
  }
  .border-bottom{
    border-bottom: 1px solid  #fff;
  }

  .billing-details{
    padding: 12px 20px;
    background-color: rgb(241,243,243);
    border-radius: 8px;
  }

  .key{
    color: 	#5A5A5A;
    font-size: 12px;
    font-weight: 400;
  }
  .value{
    font-size: 12px;
    font-weight: 400;
    
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

  .tutorial-box{
    display:flex;
    flex-direction:row;
    margin-top: 10px;
    p{
      margin: 0 5px;
      font-size: 12px;
      line-height: 17px;
      margin-top: 10px;
      color: rgb(155, 155, 166);
    }
  }
  
  .submit-button{
    width: 100%;
    margin-top:15px;
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
`
