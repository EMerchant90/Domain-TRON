import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from 'components/Modal/Modal'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppLoader } from 'state/loading/hooks/useAppLoader';
import { useTronWalletAddress, } from 'state/user/hooks';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';
import truncateAddress from 'utils/truncateAddress';
import { getFrozenEnergyRatio } from 'utils/web3/getFrozenEnergyRatio';
import { getFrozenBandwidthRatio } from 'utils/web3/getFrozenBandwidthRatio';

interface IFormInput {
    amount: number
}

const ReclaimModal = ({ showModal, setShowModal, data }) => {
    const walletAddress = useTronWalletAddress();
    const { hideLoader, showLoader } = useAppLoader();

    const [reclaimAmount, setReclaimAmount] = useState<number>(0)
    const [returnResource, setReturnResource] = useState<number>(0)
    const [energyPerTrx, setEnergyPerTrx] = useState<number>(0)
    const [BandwidthPerTrx, setBandwidthPerTrx] = useState<number>(0)


    useEffect(() => {
        const fetch = async () => {
            if (data["Resource Type"] === "Energy") {
                const res = await getFrozenEnergyRatio();
                setEnergyPerTrx(res)
            } else {
                const res = await getFrozenBandwidthRatio();
                setBandwidthPerTrx(res)
            }
        }
        fetch()
    }, [showModal])

    useEffect(() => {
        if (data["Resource Type"] === "Energy") {
            setReturnResource(reclaimAmount / energyPerTrx)
        } else {
            setReturnResource(reclaimAmount / BandwidthPerTrx)
        }
    }, [reclaimAmount])

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
            const reclaimingTrx = returnResource > 1 ? Math.round(returnResource) * 1000000 : (Math.round(returnResource) + 1) * 1000000

            const method = await tronweb.transactionBuilder.undelegateResource(reclaimingTrx, data["To"], data["Resource Type"] === "Energy" ? "ENERGY" : "BANDWIDTH", walletAddress)
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
        <Modal show={showModal} title={"Reclaim Resources"} changeModal={setShowModal}>
            <ReclaimModalWrapper>

                <p className='content-heading'>
                    From : {truncateAddress(data["From"], 10, 10)}
                </p>
                <form className='content-wrapper' onSubmit={handleSubmit(submitHandler)}>
                    <div className='input-box'>
                        <div className='flex-between'>
                            <label>Reclamation Amount</label>
                            <p>Available: {data["Resource Amount"]} {data["Resource Type"]} </p>
                        </div>
                        <input
                            type='number'
                            placeholder='Enter the amount you want to reclaim'
                            autoComplete="off"
                            {...register("amount", { required: true, onChange: (event) => setReclaimAmount(event.target.value), min: 0, max: parseInt(data["Resource Amount"]) })}
                        />
                        {errors.amount?.type === "required" && <p className='error-text'>This field is required</p>}
                        {errors.amount?.type === "min" && <p className='error-text'>Value cannot be less then 0</p>}
                        {errors.amount?.type === "max" && <p className='error-text'>Value cannot be greater then available resources</p>}
                        <label className='estimation-label'>* About {returnResource ? Math.round(returnResource) : "--"} of your TRX stake will be withheld</label>

                    </div>
                    <button className='submit-button' type='submit'>
                        Unstake
                    </button>
                </form>
            </ReclaimModalWrapper>
        </Modal>
    )
}

export default ReclaimModal

const ReclaimModalWrapper = styled.div`
font-family: 'Roboto', sans-serif;
display: flex;
flex-direction: column;


.content-heading {
    font-size: 16px;
    font-weight: 600;
    margin:0;
    color: rgb(155,155,166);
    width:100%;
    text-align:center;
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
    .estimation-label{
        font-size: 14px !important;
        line-height: 1.5715 !important;
        list-style: none !important;
        color: #101010 !important;
        margin-top:10px !important;
    }
`