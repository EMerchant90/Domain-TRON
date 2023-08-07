import React, { useEffect } from 'react'
import styled from "styled-components";

const EnergyDetails = () => {
  return (
    <EnergyDetailsWrapper>

    <div className='energy-pricing'>
        <p className='energy-pricing-description'> Price for Renting 100,000 Energy <span>Subsidized</span></p>
        <div className='energy-pricing-value'>
            <h3>≈</h3>   
            <h1>7.026</h1>
            <span>TRX/Day</span>
         </div>
        <p className='energy-pricing-sub-description'>Current price (9.525 TRX/Day) - Subsidies (2.499 TRX/Day)</p>
    </div>

    <div className='other-ways'>
        <p>Other ways to get Energy</p>
        <div className='flex-row'>
            <div className='other-ways-details'>
                <img src='https://app.justlend.org/static/media/need-stake-icon.0c20e93e.svg'/>
                <p>Get 100,000 Energy by staking</p>
                <p className='price'>5940<span>TRX</span></p>
            </div>
            <div className='other-ways-details'>
            <img src="https://app.justlend.org/static/media/need-burn-icon.e02fe1d2.svg" />
                <p>Get 100,000 Energy by burning</p>
                <p className='price'>42<span>TRX</span></p>
            </div>
        </div>
    </div>


    <div className='gradient-box'>
        <p>Up to 50% Discount<br/>
Rent More Energy, Get Higher Discount!</p>
        <span>Rules ></span>
    </div>

</EnergyDetailsWrapper>


    )
}

export default EnergyDetails


const EnergyDetailsWrapper = styled.div`
    margin-right:20px;
    padding: 60px 30px 40px;
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    background-color: #fff;
    background: linear-gradient(to bottom right, #6699FF 0%, #FFFFFF 25%);
    border-radius:10px;
    font-family : 'Roboto', sans-serif;


    & .energy-pricing-description{
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 8px;

        span{
            background-color: rgba(56, 136, 255, 0.6);
            color: #fff;
            padding: 3px;
            border-radius:4px;
            font-size: 12px;

        }

    }

    & .energy-pricing-value{
        display:flex;
        flex-direction:row;
        align-items:center;
        h3{
            margin-right: 3px;
            font-size: 20px;
            line-height: 55px;
            margin:0;
        }
        h1{
            font-weight: 700;
            font-size: 40px;
            line-height: 55px;
            background: linear-gradient(90deg , rgba(56, 136, 255, 1) , rgb(155, 155, 166));
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color:transparent;
            margin:0;

        }
        span{
            font-weight: 400;
            font-size: 20px;
            line-height: 22px;
            margin-left: 4px;
            margin:0;
        }
    }

    & .energy-pricing-sub-description{
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        color: rgb(155, 155, 166);
        margin:0;
    }

    & .other-ways{
        padding: 26px 20px;
        border-radius:10px;
        margin-top:66px;
        background-color: rgb(241,243,243);

        p{
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            margin:0;
        }

       & .other-ways-details{
        img{
            filter: brightness(0) saturate(100%) invert(48%) sepia(90%) saturate(637%) hue-rotate(195deg) brightness(102%) contrast(107%);
        }
        p{
            margin:0;
            margin-top:8px;

            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 17px;
        }
          & .price{
                font-weight: 600;
                font-size: 18px;
                line-height: 25px;
                margin-top:8px;

                span{
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 19px;
                    margin-left: 4px;
                }
            }
        }
    }

& .flex-row{
    display:flex;
    flex-direction:row; 
    margin-top: 27px;
    justify-content: space-between;
    min-width:500px;
}

    & .gradient-box{
        display:flex;
        flex-direction:row;
        justify-content: space-between;
        align-items:center;
        margin-top: 66px;
        padding: 29px 20px;
        background: linear-gradient(90deg , rgba(56, 136, 255, 1) , #ddd);
        color: #fff;
        border-radius: 10px;

        p{
            font-weight: 400;
            font-size: 16px;
            color: #fff;
            line-height: 22px;
            margin:0;
        }
        span{
            background-color: rgba(56, 136, 255, 0.6);
            color: rgb(255, 255, 255);
            padding: 3px 10px;
            border-radius:4px;
            font-weight: 400;
            font-size: 12px;
            line-height: 23px;
        
        }
    }

`