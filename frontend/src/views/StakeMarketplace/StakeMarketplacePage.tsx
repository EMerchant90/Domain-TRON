import React from 'react'
import styled from 'styled-components'
import APYBox from './components/APYBox'
import StakeBox from './components/StakeBox'

const StakeMarketplacePage = () => {
    return (
        <StakeMarketplacePageWrapper>
            <div className='heading'>
                <span />
                <p>
                    Staked TRX
                </p>
            </div>
            <p className='heading-description'>
                Stake your TRX to get sTRX and earn double yields.
            </p>
            <div className='main-flex'>
                {/* <APYBox /> */}
                <StakeBox />
            </div>
        </StakeMarketplacePageWrapper>
    )
}

export default StakeMarketplacePage

const StakeMarketplacePageWrapper = styled.div`
    margin-top: 50px;
    font-family : 'Roboto', sans-serif;
    height:75vh;
    max-width: 700px;
    display:flex;
    flex-direction:column;
    
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

    & .main-flex{
        display:flex;
        flex-direction:row;
        width:100%;
        justify-content:space-between;
    }

`