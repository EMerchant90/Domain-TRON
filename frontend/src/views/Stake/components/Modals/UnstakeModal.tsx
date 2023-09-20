import React from 'react'
import styled from 'styled-components'
import Modal from 'components/Modal/Modal'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppLoader } from 'state/loading/hooks/useAppLoader';
import { useTronWalletAddress, } from 'state/user/hooks';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';

interface IFormInput {
    amount: number
}

const UnstakeModal = ({ showModal, setShowModal, data }) => {
    const walletAddress = useTronWalletAddress();
    const { hideLoader, showLoader } = useAppLoader();

    const [unstakeAmount, setUnstakeAmount] = React.useState<number>(0)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IFormInput>();

    const submitHandler: SubmitHandler<IFormInput> = async (formData: IFormInput) => {
        event.preventDefault();
        try {
            showLoader()
            const tronweb = window.tronWeb
            const method = await tronweb.transactionBuilder.unfreezeBalanceV2(formData.amount * 1000000, data["Resource Type"] === "Energy" ? "ENERGY":"BANDWIDTH", walletAddress)

            const sign = await window.tronWeb.trx.sign(method);
            const transaction = await window.tronWeb.trx.sendRawTransaction(sign);

            setShowModal(false)
            hideLoader()
        const explorerLink = `https://nile.tronscan.org/#/transaction/${transaction.txID}`

            sweetAlertService.showSuccessAlert("Transaction successfull", `You successfully unstaked your TRX from ${data["Resource Type"]}`, explorerLink)
        } catch (err: any) {
            console.log(err)
            hideLoader()
            sweetAlertService.showErrorAlert("Transaction Failed", err.message);
        }
    }
    return (
        <Modal show={showModal} title={"Unstake TRX"} changeModal={setShowModal}>
            <UnstakeModalWrapper>

                <p className='content-heading'>
                    Unstaking From : {data["Resource Type"]}
                </p>
                <form className='content-wrapper' onSubmit={handleSubmit(submitHandler)}>
                    <div className='input-box'>
                        <div className='flex-between'>
                            <label>Unstake Amount</label>
                            <p>Available: {data["Staked Asset"]}</p>
                        </div>
                        <input
                            type='number'
                            placeholder='Enter the amount you want to unstake'
                            autoComplete="off"
                            {...register("amount", { required: true, onChange: (event) => setUnstakeAmount(event.target.value), min: 0, max: parseInt(data["Staked Asset"]) })}
                        />
                        {errors.amount?.type === "required" && <p className='error-text'>This field is required</p>}
                        {errors.amount?.type === "min" && <p className='error-text'>Value cannot be less then 0</p>}
                        {errors.amount?.type === "max" && <p className='error-text'>Value cannot be greater then available resources</p>}

                    </div>
                    <button className='submit-button' type='submit'>
                        Unstake
                    </button>
                    <span className='period-text'>* The TRX will be able to be withdrawn after the 14-day unstaking period</span>
                </form>
            </UnstakeModalWrapper>
        </Modal>
    )
}

export default UnstakeModal

const UnstakeModalWrapper = styled.div`
font-family: 'Roboto', sans-serif;
display: flex;
flex-direction: column;


.content-heading {
    font-size: 16px;
    font-weight: 600;
    margin:0;
    color: rgb(155,155,166);
}
.input-box{
    display:flex;
    flex-direction:column;
    margin: 20px 0 ;

    label{
        color: #101010;
        font-weight: 500;
        margin-bottom: 10px;
        color: rgb(155,155,166);
    }

    input{
        padding: 10px 15px;
        border: 1px solid #c2c9d1;
        border-radius: 10px;
    }
    input:placeholder{
        color: #101010;
    }
}

  .submit-button{
    width: 100% ;
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
    margin-bottom:10px;
  }
  .submit-button:hover{
    color: #5a5a5a
  }

  .error-text{
    font-size: 12px !important;
    font-weight: 500 !important;
    color:red !important;
    margin:10px 0 0 0  !important; 
  }
  .flex-between{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    }
    .period-text{
        color: #73787b !important;
        font-size: 12px;
    }
`