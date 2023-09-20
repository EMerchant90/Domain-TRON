import React, { useState, useEffect } from 'react'
import Modal from "components/Modal/Modal"
import styled from "styled-components"
import { useAppLoader } from 'state/loading/hooks/useAppLoader';
import { useTronWalletAddress, } from 'state/user/hooks';
import { useForm, SubmitHandler } from "react-hook-form"
import { getFrozenEnergyRatio } from 'utils/web3/getFrozenEnergyRatio';
import { getFrozenBandwidthRatio } from 'utils/web3/getFrozenBandwidthRatio';
import sweetAlertService from 'utils/SweetAlertServices/sweetAlertServices';
import { getUserEnergy } from 'utils/web3/getWalletEnergy';
import { getUserBandwidth } from 'utils/web3/getWalletBandwidth';

interface IFormInput {
    recieverAddress: string
    amount: number
}

const DelegateResourcesModal = ({ showModal, setShowModal, index }) => {
    const walletAddress = useTronWalletAddress();

    const { hideLoader, showLoader } = useAppLoader();
    const [delegateResource, setDelegateResource] = useState(0)
    const [returnResource, setReturnResource] = useState(0)
    const [energyPerTrx, setEnergyPerTrx] = useState(0)
    const [BandwidthPerTrx, setBandwidthPerTrx] = useState(0)
    const [recieverAddress, setRecieverAddress] = useState("")
    const [availableResource, setAvailableResource] = useState(0)

    useEffect(() => {
        const fetch = async () => {
            showLoader()
            if (index === 0) {
                const res = await getFrozenEnergyRatio();
                setEnergyPerTrx(res)
                hideLoader()
            } else {
                const res = await getFrozenBandwidthRatio();
                setBandwidthPerTrx(res)
                hideLoader()
            }
        }
        fetch()
    }, [showModal])

    useEffect(() => {
        if (walletAddress === null) return
        const fetch = async () => {
            if (index === 0) {
                const res = await getUserEnergy(walletAddress)
                setAvailableResource(res.EnergyUsed ? res.EnergyLimit - res.EnergyUsed : res.EnergyLimit)
            } else {
                const res = await getUserBandwidth(walletAddress)
                setAvailableResource(res)
            }
        }
        fetch()
    }, [walletAddress])


    useEffect(() => {
        if (index == 0) {
            setReturnResource(delegateResource / energyPerTrx)
        } else {
            setReturnResource(delegateResource / BandwidthPerTrx)
        }
    }, [delegateResource])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IFormInput>();

    const submitHandler: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        event.preventDefault();
        try {
            showLoader()
            const tronweb = window.tronWeb
            const method = await tronweb.transactionBuilder.delegateResource(Math.round(returnResource) * Math.pow(10, 6), data.recieverAddress, index === 0 ? "ENERGY" : "BANDWIDTH", walletAddress, { visible: true })

            const sign = await window.tronWeb.trx.sign(method);
            const transaction = await window.tronWeb.trx.sendRawTransaction(sign);

            setShowModal(false)
            hideLoader()
            sweetAlertService.showSuccessAlert("Transaction successfull", `You successfully delegated ${index === 0 ? "ENERGY" : "BANDWIDTH"} to ${recieverAddress}`, transaction.txid)
        } catch (err: any) {
            console.log(err)
            hideLoader()
            sweetAlertService.showErrorAlert("Transaction Failed", err.message);
        }
    }

    return (
        <Modal show={showModal} title={"Delegate resources to others"} changeModal={setShowModal}>
            <DelegateResourcesModalWrapper>

                <p className='content-heading'>
                    Resource to delegate : {index === 0 ? 'Energy' : 'Bandwidth'}
                </p>
                <form className='content-wrapper' onSubmit={handleSubmit(submitHandler)}>


                    <div className='input-box'>
                        <label>To</label>
                        <div className='divider' />
                        <input
                            type='text'
                            placeholder='Enter reciever wallet address'
                            {...register("recieverAddress", { required: true, onChange: (event) => setRecieverAddress(event.target.value) })}
                        />
                    </div>
                    {errors.recieverAddress && <p className='error-text'>This field is required</p>}
                    <div className='input-box'>
                        <div className='flex-between'>
                            <label>Staking Amount</label>
                            <p>Available {availableResource ? availableResource.toFixed(0) : " --"} </p>
                        </div>
                        <input
                            type='number'
                            placeholder='Enter the amount you want to delegate'
                            autoComplete="off"
                            {...register("amount", { required: true, onChange: (event) => setDelegateResource(event.target.value), min: 0 })}
                        />
                        {errors.amount?.type === "required" && <p className='error-text'>This field is required</p>}
                        {errors.amount?.type === "min" && <p className='error-text'>Value cannot be less then 0</p>}

                        <label className='estimation-label'>* About {returnResource ? Math.round(returnResource) : "--"} of your TRX stake will be withheld</label>
                    </div>

                    <button className='submit-button' type='submit'>
                        Send {index === 0 ? "Energy" : "Bandwidth"}
                    </button>

                </form>

            </DelegateResourcesModalWrapper>

        </Modal>
    )
}

export default DelegateResourcesModal


const DelegateResourcesModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;

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