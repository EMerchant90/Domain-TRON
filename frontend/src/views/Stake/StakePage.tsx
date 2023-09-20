import React from 'react'
import styled from 'styled-components'
import ResourcesCard from './components/ResourcesCard'

const StakePage = () => {
    return (
        <StakePageWrapper>
            <div className='heading'>
                <span />
                <p>
                    Stake for Resources
                </p>
            </div>
            <p className='heading-description'>
                Eliminate fee of transactions while getting rewards by voting with TRON Power
            </p>
            <ResourcesCard/>
        </StakePageWrapper>
    )
}

export default StakePage

const StakePageWrapper = styled.div`
margin-top: 50px;
font-family : 'Roboto', sans-serif;
min-height:75vh;
display:flex;
flex-direction:column;
margin-bottom:50px;
min-width: 1100px;  
& .heading{
    display:flex;
    flex-direction:row;
    span{
        background-image: linear-gradient(to top, rgba(255,0,0,0),   rgb(56, 136, 255));
        width:6px;
        display:block;    
        border-radius: 1px;
        margin-right:10px;
    }
    p{
        margin:0;
        font-size: 20px;
        font-weight: 600;
        color : #506690;

    }
}

& .heading-description{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: rgb(155, 155, 166);
}
`
