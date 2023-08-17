import React from 'react'
import styled from 'styled-components'
import SendTrxForm from './components/SendTrxForm'

const SendTRXPage = () => {
    return (
        <SendTRXWrapper>
            <div className='heading'>
                <span />
                <p>
                    Send TRX
                </p>
            </div>
            <p className='heading-description'>
                Send TRX to any address
            </p>
            <div>
                <SendTrxForm />
            </div>
        </SendTRXWrapper>
    )
}

export default SendTRXPage

const SendTRXWrapper = styled.div`
height: 70vh;
margin-top: 50px;
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
}`