import React , {useEffect} from 'react'
import styled from 'styled-components'
import { SemiCircleProgress } from "react-semicircle-progressbar"
import ResourceModal from './Modals/ResourceModal'
import DelegateResourcesModal from './Modals/DelegateResourcesModal'


const BandwidthCard = ({bandwidthInfo}) => {
    const [showResourceModal, setShowResourceModal] = React.useState(false);
    const [showDelegateModal, setDelegateShowModal] = React.useState(false);

    const [bandwidthDelegatedToOthers, setBandwidthDelegatedToOthers] = React.useState(0)
    const [bandwidthFromStaking , setBandwidthFromStaking] = React.useState(0)
    const [bandwidthDelegatedByOthers  , setBandwidthDelegatedByOthers] = React.useState(0)

    useEffect(()=>{

        const frozenTrxForBandwidthDelegation = bandwidthInfo.delegatedFrozenV2BalanceForBandwidth / Math.pow(10,6)
        const delegatedToOthers = frozenTrxForBandwidthDelegation * bandwidthInfo.netCost
        setBandwidthDelegatedToOthers(delegatedToOthers)

        const balanceFrozenForBandwidthV2 = bandwidthInfo.frozenForBandWidthV2 / Math.pow(10,6)
        const bandwidthGainedFromStaking = balanceFrozenForBandwidthV2 * bandwidthInfo.netCost
        setBandwidthFromStaking(bandwidthGainedFromStaking)

        if( Math.round(bandwidthInfo.bandwidth.netLimit - bandwidthGainedFromStaking) < 1 ){
            setBandwidthDelegatedByOthers(0)
        }else{
            const delegatedByOthers = bandwidthInfo.bandwidth.netLimit - bandwidthGainedFromStaking + delegatedToOthers
            setBandwidthDelegatedByOthers(delegatedByOthers)
        }
},[bandwidthInfo])

    const remainingPercentage =  Math.round((bandwidthInfo.bandwidth.netRemaining / bandwidthInfo.bandwidth.netLimit) * 100)
            
  return (
    <BandwidthCardWrapper>
           <p className='content-header'>
                Bandwidth
            </p>

            <div className='flex-row'>
                <div>
                <SemiCircleProgress
                    percentage={remainingPercentage}
                    size={{
                        width: 120,
                        height: 120,
                    }}
                    strokeWidth={5}
                    strokeColor="rgb(37, 210, 198)"
                    />
                    </div>
                <div className='detail-box'>
                    <div className='flex-row'>
                        <p className='key'>
                            <span className='colored-box' />
                            From Staking</p>
                        <span className='value'>+{bandwidthFromStaking.toFixed(2)}</span>
                    </div>
                    <div className='flex-row'>
                        <p className='key'>
                            <span className='colored-box' />
                            Delegated by others</p>
                        <span className='value'>+{bandwidthDelegatedByOthers}</span>
                    </div>
                    <div className='flex-row'>
                        <p className='key'>
                            <span className='colored-box' />
                            Delegated to others</p>
                        <span className='value'>-{bandwidthDelegatedToOthers.toFixed(2)}</span>
                    </div>
                </div>

            </div>
            <div className='flex-row'>
                <p>
                    Total ≈  {bandwidthInfo.bandwidth.netLimit} 
                </p>
                <div className='button-box'>
                    <button className='get-button' onClick={()=>setShowResourceModal(true)}>Get Bandwidth</button>
                    <button className='delegate-button'  onClick={()=>setDelegateShowModal(true)}>Delegate to others</button>

                </div>
            </div>

            {showResourceModal && <ResourceModal showModal={showResourceModal} setShowModal={setShowResourceModal} index={1} />}
            {showDelegateModal && <DelegateResourcesModal showModal={showDelegateModal} setShowModal={setDelegateShowModal} index={1} />}

    </BandwidthCardWrapper>
  )
}

export default BandwidthCard


const BandwidthCardWrapper = styled.div`   
background-color: #f4fbfa;

padding: 20px;
border-radius: 10px;
display:flex;
flex-direction:column;


.content-header{
    margin:0;
    font-size: 16px;
    font-weight: 400;
    color : rgb(37, 210, 198);;
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
}
.key{
    margin:0;
    min-width: 190px;
    color: #73787b;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom:10px;
    .colored-box{
        display:inline-block;
        background-color:rgb(37, 210, 198);;
        width:5px;
        height:10px;
        border-radius:2px;
        margin-right:5px;
    }
}

.value{
    margin:0;
    font-size: 14px !important;
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
    margin-right:10px;
    border: none;
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