import React from 'react'
import styled from 'styled-components'
import { SemiCircleProgress } from "react-semicircle-progressbar"
import ResourceModal from './ResourceModal'
import DelegateResourcesModal from './DelegateResourcesModal'

const EnergyCard = ({ energyInfo }) => {
    const [showResourceModal, setShowResourceModal] = React.useState(false);
    const [showDelegateModal, setDelegateShowModal] = React.useState(false);

    const remainingEnergy = () => {
        if (energyInfo) {
            return (energyInfo.energyRemaining / energyInfo.energyLimit) * 100
        }
    }

    return (
        <EnergyCardWrapper>
            <p className='content-header'>
                Energy
            </p>

            <div className='flex-row'>
                <SemiCircleProgress
                    percentage={remainingEnergy()}
                    size={{
                        width: 120,
                        height: 120,
                    }}
                    strokeWidth={5}
                    strokeColor="rgb(255, 203, 146)"
                />

                <div className='detail-box'>
                    <div className='flex-row'>
                        <p className='key'>
                            <span className='colored-box' />
                            From Staking</p>
                        <span className='value'>+81000</span>
                    </div>
                    <div className='flex-row'>
                        <p className='key'>
                            <span className='colored-box' />
                            Delegated by others</p>
                        <span className='value'>+50000</span>
                    </div>
                    <div className='flex-row'>
                        <p className='key'>
                            <span className='colored-box' />
                            Delegated to others</p>
                        <span className='value'>-10000</span>
                    </div>
                </div>

            </div>
            <div className='flex-row'>
                <p>
                    Total ≈ {energyInfo ? energyInfo.energyLimit : "--"}
                </p>

                <div className='button-box'>
                    <button className='get-button' onClick={() => setShowResourceModal(true)}>Get Energy</button>
                    <button className='delegate-button' onClick={() => setDelegateShowModal(true)}>Delegate to others</button>
                </div>
            </div>
            {showResourceModal && <ResourceModal showModal={showResourceModal} setShowModal={setShowResourceModal} index={0} />}
            {showDelegateModal && <DelegateResourcesModal showModal={showDelegateModal} setShowModal={setDelegateShowModal} index={0} />}
        </EnergyCardWrapper>
    )
}

export default EnergyCard

const EnergyCardWrapper = styled.div`
background-color: #fffbf6;
padding: 20px;
border-radius: 10px;
display:flex;
flex-direction:column;
margin-right:20px;


.content-header{
    margin:0;
    font-size: 16px;
    font-weight: 400;
    color : rgb(255, 203, 146);
    margin-bottom:20px;
    
}
.flex-row{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;

}
.detail-box{
    display:flex;
    flex-direction:column;
    margin-left:20px;
    width:60%;
}
.key{
    margin:0;
    color: #73787b;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom:10px;
    .colored-box{
        display:inline-block;
        background-color:rgb(255, 203, 146);
        width:5px;
        height:10px;
        border-radius:2px;
        margin-right:5px;
    }
}

.value{
    margin:0;
    font-size: 14px;
    font-weight: 600;
    color: #101010;
    margin-bottom:10px;
}
.button-box{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    margin-left:20px;
}
.get-button{
    background: #101010;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    min-width: 110px;
    padding: 8px 20px;
    text-align: center;
    border: none;
    margin-right:10px;
}
.get-button:hover{
    background-color: rgba(227,93,88,0.7);
    border: none;
}
.delegate-button{
    background: transparent;
    border: 1px solid #91979d;
    border-radius: 6px;
    color: #101010;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    min-width: 110px;
    padding: 7px 10px;
    text-align: center;
    cursor: pointer;
}
.delegate-button:hover{
   color: rgba(227,93,88,7);
    border: 1px solid rgba(227,93,88,0.7);
}


`