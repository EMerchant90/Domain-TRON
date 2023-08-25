import React from 'react'
import styled from 'styled-components'
import EnergyCard from './EnergyCard'
import BandwidthCard from './BandwidthCard'


const ResourcesCard = () => {
  return (
    <ResourcesCardWrapper>
        
        <p className='content-header'>

        My Resources
        </p>


    <div className='main-flex'>
    <EnergyCard/>
    <BandwidthCard/>
    </div>

      <div className='total-resources'>
        <p>Total Resources</p>

      <div className='details-box'>
        <div className='main-flex'>
          <p>TRX</p>
          <p>4000 TRX</p>
        </div>
          <div className='main-flex'>
          <p>sTRX</p>
          <p>4000</p>
        </div>
        <div className='main-flex'>
          <p>Energy</p>
          <p>400000</p>
        </div>
        <div className='main-flex'>
          <p>Bandwidth</p>
          <p>4000</p>
        </div>
      </div>
     
      </div>

    </ResourcesCardWrapper>
  )
}

export default ResourcesCard


const ResourcesCardWrapper = styled.div`
    display:flex;
    flex-direction:column;
    padding: 26px 30px ;
    box-shadow: 0 10px 20px rgba(0,0,0,.1);
    background-color: #fff;
    background: linear-gradient(to bottom right, #6699FF 0%, #FFFFFF 45%);
    border-radius:10px;
    font-family : 'Roboto', sans-serif;

    .content-header{
        margin:0;
        font-size: 20px;
        font-weight: 600;
        color : #506690;
        margin-bottom:20px;
        
    }
    .main-flex{
      display:flex;
      flex-direction:row;
      justify-content:space-between;

      p{
        margin:0;
        font-size: 16px;
        font-weight: 400;
        color : #73787b;
      }
      span{
        margin:0;
        font-size: 16px;
        font-weight: 600;
        color : #506690;
      }
    }

    .details-box{
      background-color: rgb(241,243,243);
      padding: 20px;
    }

  
`       