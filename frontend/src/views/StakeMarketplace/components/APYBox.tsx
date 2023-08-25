import React from 'react'
import styled from 'styled-components'

const APYBox = () => {
  return (
    <APYBoxWrapper>
        <div className='main-div'>
            <div className='content'>
                <h3>APY</h3>
                {/* APY value in percentage here */}
                <h1>4.62%</h1>
                <p>The yields consist of voting rewards from TRON governance and yields from Energy rental.</p>
            </div>
            <img src='https://app.justlend.org/static/media/apy.fe4718b6.png'/>
        </div>
    </APYBoxWrapper>
  )
}

export default APYBox


const APYBoxWrapper = styled.div`
    padding: 80px 30px 0;
    margin-right:20px;
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    background-color: #fff;
    background: linear-gradient(to bottom left, #6699FF 0%, #FFFFFF 45%);
    border-radius:10px;
    font-family : 'Roboto', sans-serif;
    .main-div{
        display:flex;
        flex-direction:row;
        justify-content:space-between;

        img{
            max-width: 150px;
            max-height: 130px;
        }
    }

    .content{
        display:flex;
        flex-direction:column;

        h3{
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            margin:0 0  10px 0 ;
        }
        h1{
            font-weight: 700;
            font-size: 30px;
            line-height: 41px;
            margin:0 0  10px 0 ;
        }
        p{
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            max-width: 64%;
            color: rgb(155, 155, 166);
            margin:0;
        }

    }
`