import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { STRXIcon, TRXIcon } from 'components/Icons'
import { useTronWalletAddress, useUserActionHandlers } from "../../../state/user/hooks";
import { toast } from "react-toastify";
import { stakeTron, unstakeTron, getTrxBalanceOfContract, getTotalContractSupply , getUserStrxBalance } from 'contract/contractInteraction'
import { convertTRXToUSD } from 'api/trxToDollar'
import { getWalletTrxBalance } from 'utils/web3/getWalletTrxBalance'
import { useAppLoader } from 'state/loading/hooks/useAppLoader'
import ClaimAble from './ClaimAble'

interface IFormInput {
    amount: number
}


const StakeBox = () => {

    const { showLoader, hideLoader } = useAppLoader();
    const walletTrxBalance = getWalletTrxBalance()
    const walletAddress = useTronWalletAddress();
    const { onUpdateTronWalletAddress } = useUserActionHandlers();

    const [trxToDollar, setTrxToDollar] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [stakeAmount, setStakeAmount] = useState(0);
    const [stakeEstimate, setStakeEstimate] = useState(0);
    const [totalSupply, setTotalSupply] = useState(0);
    const [contractTrxBalance, setContractTrxBalance] = useState(0);
    const [ratio, setRatio] = useState('');
    const [strxBalance, setStrxBalance] = useState(0)
    const [userBalance, setUserBalance] = useState(0);
    const multiplier = 10 ** 2

    useEffect(() => {
        async function fetchData() {
            const [value, supply, contractBalance  ] = await Promise.all([
                convertTRXToUSD(),
                getTotalContractSupply(),
                getTrxBalanceOfContract(),
            ]);
            setTotalSupply(supply.toNumber());
            setContractTrxBalance(contractBalance.toNumber());
            setTrxToDollar(value);
        }
        fetchData();
    }, []);

    useEffect(() => {

        const fetch = async () => {
            if(walletAddress === null) return
            const strx = await getUserStrxBalance(walletAddress)
            setStrxBalance(strx.amount.toNumber() / Math.pow(10, 6))
        }
        fetch()

    },[walletAddress])

    useEffect(() => {
        if (totalSupply === 0 || contractTrxBalance === 0) {
            setStakeEstimate(stakeAmount);
        } else {
            const multiplier = activeTab === 0 ? totalSupply : contractTrxBalance;
            const divisor = activeTab === 0 ? contractTrxBalance : totalSupply;
            setStakeEstimate((stakeAmount * multiplier) / divisor);
        }
    }, [stakeAmount, contractTrxBalance, totalSupply]);

    useEffect(() => {
        if (activeTab === 0) {
            setUserBalance(walletTrxBalance)
        } else {
            setUserBalance(strxBalance)
        }
    }, [walletAddress, activeTab, walletTrxBalance])

    useEffect(() => {
        const token = activeTab === 0 ? 'sTRX' : 'TRX'
        if (totalSupply === 0 || contractTrxBalance === 0) {
            setRatio(`1 ${token}`)
        } else {
            const multiplier = activeTab === 0 ? totalSupply : contractTrxBalance;
            const divisor = activeTab === 0 ? contractTrxBalance : totalSupply;
            setRatio(`${(1 * multiplier) / divisor}  ${token}`)
        }
        setStakeAmount(0)

    }, [activeTab])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();

    const submitHandler: SubmitHandler<IFormInput> = (data) => {
        event.preventDefault();
        showLoader();
        if (activeTab === 0) {
            stakeTron(data.amount).finally(() => {
                hideLoader();
               reset();

            });
        } else {
            unstakeTron(data.amount).finally(() => {
                hideLoader();
                reset();

            });
        }
        reset();
    };

    const percents = ["25%", "50%", "75%", "100%"];

    const calculatePercentageValue = (percentage) => {
        return (userBalance * percentage) / 100;
    };

    // Function to handle percentage button click
    const handlePercentageButtonClick = (percentage) => {
        const calculatedValue = calculatePercentageValue(percentage);
        setStakeAmount(calculatedValue);
    };

    const handleConnectWalletClick = async () => {
        event.preventDefault();
        if (window.tronWeb && !window.tronWeb.ready) {
            toast("Please Unlock Tron Web First");
        } else if (window.tronWeb && window.tronWeb.ready) {
            const base58Address = window.tronWeb.defaultAddress.base58;
            if (base58Address) {
                onUpdateTronWalletAddress(base58Address);
            }
        } else {
            toast("Please Install Tron Web Extension.");
        }
    };

    return (
        <StakeBoxWrapper>
            <div className='tabs'>
                <button
                    className={activeTab === 0 ? 'active' : ''}
                    onClick={() => {
                        setActiveTab(0);
                        reset();
                    }}
                >
                    Stake
                </button>
                <button
                    className={activeTab === 1 ? 'active' : ''}
                    onClick={() => {
                        setActiveTab(1);
                        reset();
                    }}
                >
                    Unstake
                </button>
                <button
                    className={activeTab === 2 ? 'active' : ''}
                    onClick={() => {
                        setActiveTab(2);
                        reset();
                    }}
                >
                    Claimable
                </button>
            </div>

            {activeTab !== 2 && <div className='flex-between' >
                <p className='amount-text'>Amount</p>
                {/* Add balance here */}
                <p className='balance-text'>
                    Balance <span>{userBalance !== null ? (userBalance + (activeTab === 0 ? ' TRX' : ' sTRX')) : '--'}</span>
                </p>
            </div>}
            {activeTab !== 2 && <form onSubmit={handleSubmit(submitHandler)}>
                <div className='input-box'>
                    <input
                        type='number'
                        placeholder='100.00'

                        value={stakeAmount === 0 ? '' : stakeAmount}
                        {...register('amount', {

                            required: true,
                            onChange(event) {
                                setStakeAmount(event.target.value);
                            },
                            maxLength: 10,
                        })}
                    />
                    {/* add value in dollar here */}
                    <label>≈&nbsp;{Math.trunc((trxToDollar * (stakeAmount ? stakeAmount : 1000)) * multiplier) / multiplier}</label>

                    <div className='divider' />
                    {activeTab === 0 ? <TRXIcon /> : <STRXIcon />}
                    <p>{activeTab === 0 ? 'TRX' : 'sTRX'}</p>
                </div>
                {errors.amount?.type === 'required' && <p className='error-text'>This field is required</p>}
                {errors.amount?.type === 'maxLength' && <p className='error-text'>Amount must be less than 1000000000</p>}

                <div className='buttons-box'>
                    {percents.map((percent, index) => (
                        <button className='percent-buttons' key={index}
                            onClick={() => {
                                event.preventDefault();
                                handlePercentageButtonClick(parseInt(percent))
                            }}
                        >
                            {percent}
                        </button>
                    ))}
                </div>

                <div className='flex-between mt-2 '>
                    <p className='key'>You Will Get (Est.)</p>
                    {/* add estimated value */}
                    <span className='value'>
                        {stakeEstimate ? stakeEstimate : "0"} {activeTab === 1 ? <TRXIcon width='14' height='14' /> : <STRXIcon width='14' height='14' />}
                        {activeTab === 0 ? 'sTRX' : 'TRX'}
                    </span>
                </div>
                <div className='flex-between mt-2'>
                    <p className='key'>Ratio</p>
                    <span className='value'>{`1 ${activeTab === 0 ? 'TRX' : 'sTRX'} = ${ratio}`}</span>
                </div>

                {walletAddress ? (
                    <button className='submit-button' type='submit'>
                        {activeTab === 0 ? 'Stake Now' : 'Unstake Now'}
                    </button>
                ) : (
                    <button className='submit-button' onClick={handleConnectWalletClick} type='button'>
                        Connect wallet
                    </button>
                )}
                <div className='tutorial-box'>
                    <img src='https://app.justlend.org/static/media/warning-yellow-icon.880d4dde.svg' alt='Warning Icon' />
                    <p>The TRX will be available for withdrawal after the 14-day unstaking period ends.</p>
                </div>
            </form>}

            {activeTab === 2 && <ClaimAble/>}
        </StakeBoxWrapper>
    );

}

export default StakeBox

const StakeBoxWrapper = styled.div`
    padding: 26px 30px ;
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    background-color: #fff;
    background: linear-gradient(to bottom right, #6699FF 0%, #FFFFFF 45%);
    border-radius:10px;
    font-family : 'Roboto', sans-serif;
    min-width: 640px;
    min-height: 360px;
    .mt-2{
        margin-top:20px;
    }

    .tabs{
        display:flex;
        flex-direction:row;
        align-items:center;
        width:100%;

        button{
            background: none;
            border: none;
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 25px;
            color: #5a5a5a;
            cursor:pointer;
            margin-right:10px;
            padding: 0 10px 10px;
        }
        button.active {
            border-bottom: 2px solid #6699FF;
            color: #000;
          }
      

    }

    .flex-between{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:space-between;
    }

    .amount{
        font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    }

    .balance-text{
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: rgb(155, 155, 166);

        span{
            font-weight: 600;
            color: #000;
        }
    }


    .input-box{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        background-color: rgb(241,243,243);
        border-radius: 5px;
        padding:10px 20px;
        margin-bottom: 10px;

        label{
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #5a5a5a;
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
        p{
            margin:0;
        }
        svg{
            margin-right:10px;
        }
    
    
        & .divider{
            width: 1px;
            height: 30px;
            background-color: rgba(0,0,0,.1);
            margin: 0 10px;
        }
        
    
      }
    .buttons-box{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        gap:10px;
    }
      .percent-buttons{
        background: #ddd;
        border-radius: 8px;
        border: none;
        font-weight: 500;
        height: 26px;
        font-size: 14px;
        padding:0 50px;
        transition: all .2s ease;
        margin:10px 0;
        }
      .percent-buttons:hover{
        color:#fff;
        background-color: #6699FF; 
      }

      .key{
        color: 	#5A5A5A;
        font-size: 14px;
        font-weight: 400;
        margin:0;
      }
      .value{

        font-size: 14px;
        font-weight: 400;
            svg{
                margin:0 5px;
            }
      }
    
      .submit-button{
        width: 100%;
        margin-top:15px;
        padding: 10px 15px;
        border-radius: 8px;
        border:none;
        background: rgba(56, 136, 255, 1) ;
        color:#fff;
        font-weight: 500;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
      .submit-button:hover{
        background: rgba(56, 136, 255, 0.3) ;
        color: #5a5a5a
      }

      .tutorial-box{
        display:flex;
        flex-direction:row;
        margin-top: 20px;
        p{
          margin: 0 5px;
          font-size: 12px;
          color: rgb(155, 155, 166);
        }
      }
      

  .error-text{
    font-size: 12px;
    font-weight: 500;
    color:red;
    margin:0;
    margin-bottom:10px;
    
}
`