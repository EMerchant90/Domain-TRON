import React from 'react'
import styled from "styled-components";
import { useState } from "react";
import EnergyDetails from './components/EnergyDetails';
import EnergryRentCard from './components/EnergryRentCard';


const EnergyRent = () => {
    return (
        <EnergyRentWrapper>
            <div className='heading'>
                <span />
                <p>
                    Energy Rental
                </p>
            </div>
            <p className='heading-description'>
                A Marketplace for Energy rental.
            </p>
            <div className='main-flex'>

              {/* <EnergyDetails/> */}

                <EnergryRentCard/>
            </div>


        </EnergyRentWrapper>
    )
}

export default EnergyRent

const EnergyRentWrapper = styled.div`
    margin-top: 50px;
    font-family : 'Roboto', sans-serif;
    margin-bottom: 50px;

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
        justify-content:flex-start;
    }

`
