import React from 'react'
import Modal from "components/Modal/Modal"
import styled from "styled-components"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppLoader } from 'state/loading/hooks/useAppLoader';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';
import { useTronWalletAddress, useUserActionHandlers } from "../../../../state/user/hooks";
import { toast } from "react-toastify";

interface IFormInput {
    sendersAdress: string
    recieverAddress: string
    amount: number
}

const MintModal = () => {

    const walletAddress = useTronWalletAddress();
    const { hideLoader, showLoader } = useAppLoader();
    const { onUpdateTronWalletAddress } = useUserActionHandlers();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IFormInput>();

    const submitHandler: SubmitHandler<IFormInput> = async (data) => {
        event.preventDefault();
        console.log(data);
        showLoader();
        try {

            hideLoader();
            console.log('Transaction initiated:',);
            sweetAlertService.showSuccessAlert("Transaction Successfull", "Your TRX has been sent successfully");
        } catch (error: any) {
            hideLoader();
            sweetAlertService.showErrorAlert("Transaction Failed", error.message);
        }

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
        <Modal show={true} title={"Mint Modal"} onClose={()=>{}}>
            <MintModalWrapper>

                <p className='content-heading'>
                    Enter the following data to mint a domain
                </p>

                <form className='content-wrapper' onSubmit={handleSubmit(submitHandler)}>

                    <div className='input-box'>
                        <label>To</label>
                        <div className='divider' />
                        <input
                            type='text'
                            placeholder='Enter reciever wallet address'
                            {...register("recieverAddress", { required: true, })}
                        />
                    </div>
                    {errors.recieverAddress && <p className='error-text'>This field is required</p>}
                    <div className='input-box'>
                        <label>Amount</label>
                        <div className='divider' />
                        <input
                            type='number'
                            placeholder='3'
                            {...register("amount", { required: true, })}
                        />
                    </div>
                    {errors.amount && <p className='error-text'>This field is required</p>}



                    {walletAddress ? (
                        <button className='submit-button' type='submit'>
                            Send
                        </button>
                    ) : (
                        <button className='submit-button' onClick={handleWalletConnect}>
                            Connect wallet to mint
                        </button>
                    )}
                </form>
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
        margin-bottom: 20px;
    }


    .input-box{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:center;
        background-color: rgb(241,243,243);
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 10px;
        label{
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          min-width: 50px;
            display:flex;
            justify-content:center;
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
    
      .error-text{
        font-size: 12px;
        font-weight: 500;
        color:red;
        margin:0 0 10px 
      }

`